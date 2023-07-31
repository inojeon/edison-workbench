
#pragma once

namespace RayCad
{
	/// <summary>
	/// V3 네임스페이스
	/// </summary>
	namespace V3 {

		/// 		/// <summary>
		/// 데이터를 주어진 좌표 값에 따라 설정한다
		/// </summary>
		/// <param name="data">설정할 객체</param>
		/// <param name="x">x 좌표값</param>
		/// <param name="y">y 좌표값</param>
		/// <param name="z">z 좌표값</param>
		inline void Set(cad_type* data, cad_type x, cad_type y, cad_type z) {
			data[0] = x;
			data[1] = y;
			data[2] = z;
		}

		/// <summary>
		/// src로부터 dest 좌표값을 설정한다
		/// </summary>
		/// <param name="dest">설정할 좌표</param>
		/// <param name="src">참고할 좌표</param>
		inline void Set(cad_type* dest, cad_type* src) {
			dest[0] = src[0];
			dest[1] = src[1];
			dest[2] = src[2];
		}
	}

#define rc_delete_array(a) if (a) {delete[] a;a=NULL;}

	/// <summary>
	/// Util 네임스페이스
	/// </summary>
	namespace Util {

		/// <summary>
		/// 파일로부터 메모리 블록에 text를 로드한다
		/// </summary>
		/// <param name="filename">텍스트 파일명</param>
		/// <param name="block">메모리 블록</param>
		/// <returns>성공 여부</returns>
		bool LoadText(string filename, shared_ptr<MemoryBlock> block);
		
		/// <summary>
		/// 바이너리 파일로부터 메모리 블록에 binary를 로드한다
		/// </summary>
		/// <param name="filename">바이너리 파일명</param>
		/// <param name="block">메모리 블록</param>
		/// <returns>성공 여부</returns>
		bool LoadBinary(string filename, shared_ptr<MemoryBlock> block);

		/// <summary>
		/// 문자열을 메모리 블록에 write한다
		/// </summary>
		/// <param name="src">write할 문자열</param>
		/// <param name="dest">문자열을 저장할 메모리 블록</param>
		/// <returns>성공 여부</returns>
		bool String2MemoryBlock(string src, shared_ptr<MemoryBlock> dest);

		/// <summary>
		/// 문자열의 첫글자를 반환한다
		/// </summary>
		/// <param name="str">문자열</param>
		/// <returns>문자열의 첫글자</returns>
		char GetChar(string str);

		/// <summary>
		/// 문자열 분할
		/// </summary>
		/// <param name="input">주어진 문자열</param>
		/// <param name="delimiter">구분자</param>
		/// <returns>구분된 문자열 벡터</returns>
		vector<string> Split(string input, char delimiter);

		/// <summary>
		/// 구분자를 바탕으로 문자열을 마지막 문장까지 분할
		/// </summary>
		/// <param name="block">문자열이 저장되어 있는 메모리 블록</param>
		/// <param name="delimeter">구분자</param>
		/// <returns>구분된 문자열 벡터</returns>
		vector<vector<unsigned char*>>* SplitStrings(shared_ptr<MemoryBlock> block, char delimeter);
		
		/// <summary>
		/// 구분자를 바탕으로 문자열을 한 번 분할
		/// </summary>
		/// <param name="block">문자열이 저장되어 있는 메모리 블록</param>
		/// <param name="delimeter">구분자</param>
		/// <returns>구분된 문자열 벡터</returns>
		vector<unsigned char*>* SplitString(shared_ptr<MemoryBlock> block, char delimeter);
		
		/// <summary>
		/// 좌표를 라디안으로 변환한다
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <returns>각도</returns>
		double Position2Radian(double x, double y);

		/// <summary>
		/// 
		/// </summary>
		static int cnt = 0;
		/// <summary>
		/// 
		/// </summary>
		static int cnt2 = 0;
	}


}