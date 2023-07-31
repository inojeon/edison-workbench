#include "pch.h"


namespace RayCad {

	namespace V3 {
	}

	namespace Util {


		double Position2Radian(double x, double y) {
			double rad = atan2(y, x);
			if (rad < 0)
				rad += M_PI*2;

			return rad;
		}


		bool String2MemoryBlock(string src, shared_ptr<MemoryBlock> dest)
		{
			dest->Create(src.size());
			memmove(dest->_data, &src[0], src.size());

			return true;
		}

		char GetChar(string str)
		{
			return str[0];
		}

		bool LoadText(string filename, shared_ptr<MemoryBlock> block)
		{
			FILE* fp;
			fp = fopen(filename.c_str(), "rb");
			if (!fp)
				return false;

			fseek(fp, 0, SEEK_END);
			int length = ftell(fp);
			fseek(fp, 0, SEEK_SET);

			block->Create(length+1);
			fread(block->_data, block->_size, 1, fp);
			fclose(fp);

			return true;
		}

		bool LoadBinary(string filename, shared_ptr<MemoryBlock> block)
		{
			FILE* fp;
			fp = fopen(filename.c_str(), "rb");
			if (!fp)
				return false;

			fseek(fp, 0, SEEK_END);
			int length = ftell(fp);
			fseek(fp, 0, SEEK_SET);

			block->Create(length);
			fread(block->_data, block->_size, 1, fp);
			fclose(fp);

			return true;
		}


		vector<string> Split(string input, char delimiter) {
			vector<string> ret;
			stringstream ss(input);
			string tmp;

			while (getline(ss, tmp, delimiter)) {
				ret.push_back(tmp);
			}

			return ret;
		}

		/// <summary>
		/// block 데이터를 delimeter로 분할한다.
		/// </summary>
		/// <param name="block">분할하고자 하는 데이터가 담긴 변수</param>
		/// <param name="delimeter">분할에 사용할 구분자</param>
		/// <returns>구분자로 분할한 결과</returns>
		vector<vector<unsigned char*>>* SplitStrings(shared_ptr<MemoryBlock> block, char delimeter) {
			vector<vector<unsigned char*>>* scan_result = new vector<vector<unsigned char*>>();
			int start_position = 0, current_position = 0;
			vector<unsigned char*> partial_scan_result;


			while (current_position < block->_size)
			{
				// delimeter를 만난 경우
				if (block->_data[current_position] == delimeter)
				{
					block->_data[current_position] = '\0';
					partial_scan_result.push_back(block->_data + start_position);
					start_position = current_position + 1;
				}
				// 개행 혹은 null을 만난 경우
				else if (block->_data[current_position] == '\n' || block->_data[current_position] == '\0' || block->_data[current_position] == '\r')
				{
					// '\r\n'인 경우
					if (block->_data[current_position] == '\r' && block->_data[current_position + 1] == '\n')
					{
						block->_data[current_position] = '\0';
						block->_data[current_position + 1] = '\0';
						current_position += 2;
					}
					// '\n' 또는 '\0'인 경우
					else
					{
						block->_data[current_position] = '\0';
						current_position += 1;
					}

					partial_scan_result.push_back(block->_data + start_position);
					start_position = current_position;

					if(partial_scan_result.size() > 1)
						scan_result->push_back(partial_scan_result);
					partial_scan_result.clear();
					continue;
				}
				current_position += 1;
	

			}

			// 파싱 후 데이터가 남아 있는 경우 처리
			if (partial_scan_result.size() > 0) {
				block->_data[block->_size-1] = '\0';
				if (start_position != current_position)
					partial_scan_result.push_back(block->_data + start_position);

				if(partial_scan_result.size() > 1)
					scan_result->push_back(partial_scan_result);
			}

			return scan_result;
		}

		/// <summary>
		/// 문장 단위 delimeter split
		/// </summary>
		/// <param name="block">분할하고자 하는 데이터가 담긴 변수</param>
		/// <param name="delimeter">분할에 사용할 구분자</param>
		/// <returns>구분자로 분할한 결과</returns>
		vector<unsigned char*>* SplitString(shared_ptr<MemoryBlock> block, char delimeter) {
			int start_position = 0, current_position = 0;
			vector<unsigned char*>* scan_result = new vector<unsigned char*>();

			while (current_position < block->_size)
			{
				// delimeter를 만난 경우
				if (block->_data[current_position] == delimeter)
				{
					block->_data[current_position] = '\0';
					scan_result->push_back(block->_data + start_position);
					start_position = current_position + 1;
				}
				// 개행 혹은 null을 만난 경우
				else if (block->_data[current_position] == '\n' || block->_data[current_position] == '\0' || block->_data[current_position] == '\r')
				{
					if (block->_data[current_position] == '\r' && block->_data[current_position + 1] == '\n')
					{
						block->_data[current_position] = '\0';
						block->_data[current_position + 1] = '\0';
						current_position += 2;
					}
					else
					{
						block->_data[current_position] = '\0';
						current_position += 1;
					}

					scan_result->push_back(block->_data + start_position);
					start_position = current_position;
					break;
				}

				current_position += 1;
			}

			// 파싱 후 데이터가 남아 있는 경우 처리
			if (start_position != current_position) {
				block->_data[block->_size - 1] = '\0';
				scan_result->push_back(block->_data + start_position);
			}

			if (scan_result->size() > 1)
				return scan_result;
			else
				return NULL;
		}
	}

#ifndef _CPP
	EMSCRIPTEN_BINDINGS(module) {
		emscripten::function("SplitString", &Util::SplitString, allow_raw_pointers());
		emscripten::function("SplitStrings", &Util::SplitStrings, allow_raw_pointers());
		emscripten::function("GetChar", &Util::GetChar);

		register_vector<unsigned char*>("vector<unsigned char*>");

	}

#endif
}
