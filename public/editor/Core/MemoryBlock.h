#pragma once

#define _DEBUG_TEST

namespace RayCad
{
	/// <summary>
	/// 메모리 블럭 관리 클래스
	/// </summary>
	class MemoryBlock
	{
	public:
		/// <summary>
		/// 메모리 블록 사이즈
		/// </summary>
		unsigned int _size;

		/// <summary>
		/// 메모리 블록 포인터
		/// </summary>
		int _ptr;

		/// <summary>
		/// 메모리 블록 데이터
		/// </summary>
		unsigned char* _data;

		/// <summary>
		/// 메모리 블록을 초기화한다
		/// </summary>
		MemoryBlock() {
			_size = 0;
			_data = NULL;
			_ptr = 0;
		}

		/// <summary>
		/// 소멸자
		/// </summary>
		virtual ~MemoryBlock() {
			Destroy();
		}

		/// <summary>
		/// 현재 블록이 가리키는 인덱스를 반환한다
		/// </summary>
		/// <returns>메모리 블록의 인덱스</returns>
		unsigned int GetPtr();

		/// <summary>
		/// 현재 블록이 가리키는 인덱스를 갱신한다
		/// </summary>
		/// <param name="ptr">메모리 블록의 인덱스</param>
		void SetPtr(unsigned int ptr);

		/// <summary>
		/// 메모리 블록의 사이즈를 반환한다
		/// </summary>
		/// <returns>메모리 블록 사이즈</returns>
		unsigned int GetSize() {
			return this->_size;
		}

		/// <summary>
		/// 메모리 블록 포인터를 반환한다
		/// </summary>
		/// <returns>메모리 블록 포인터</returns>
		void* GetDataPtr() {
			return this->_data;
		}

		/// <summary>
		/// 메모리 블록을 생성한다
		/// </summary>
		/// <param name="size">메모리 블록 사이즈</param>
		void Create(int size);

		/// <summary>
		/// 문자열 메모리 블록을 생성한다
		/// </summary>
		/// <param name="data">메모리 블록에 들어갈 문자열</param>
		void CreateWithString(string data);

		/// <summary>
		/// 메모리 블록을 삭제한다
		/// </summary>
		void Destroy() {
			if (_data != NULL) {
				delete[] _data;
				_size = 0;
			}
		}

#ifndef _CPP
		val GetPointer();
#endif
		/// <summary>
		/// 1바이트 값을 기록한다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <param name="src_data">1바이트 값이 있는 공간</param>
		/// <returns>성공 여부</returns>
		inline bool Write1(int& ptr, void* src_data) {

#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + 1 > _size)
				return false;
#endif

			char* src = (char*)src_data;
			_data[ptr] = src[0];
			ptr++;

			return true;
		}
		/// <summary>
		/// 2바이트 값을 기록한다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <param name="src_data">2바이트 값이 있는 공간</param>
		/// <returns>성공 여부</returns>
		inline bool Write2(int& ptr, void* src_data) {

#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + 2 > _size)
				return false;
#endif

			char* src = (char*)src_data;
			_data[ptr] = src[0];
			ptr++;

			_data[ptr] = src[1];
			ptr++;
			return true;
		}

		/// <summary>
		/// 4바이트 값을 기록한다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <param name="src_data">4바이트 값이 있는 공간</param>
		/// <returns>성공 여부</returns>
		inline bool Write4(int& ptr, void* src_data) {
#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + 4 > _size)
				return false;
#endif

			char* src = (char*)src_data;
			_data[ptr] = src[0];
			ptr++;

			_data[ptr] = src[1];
			ptr++;

			_data[ptr] = src[2];
			ptr++;

			_data[ptr] = src[3];
			ptr++;
			return true;

		}
		/// <summary>
		/// 8바이트 값을 기록한다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <param name="src_data">8바이트 값이 있는 공간</param>
		/// <returns>성공 여부</returns>
		inline bool Write8(int& ptr, void* src_data) {
#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + 8 > _size)
				return false;
#endif

			char* src = (char*)src_data;
			_data[ptr] = src[0];
			ptr++;

			_data[ptr] = src[1];
			ptr++;

			_data[ptr] = src[2];
			ptr++;

			_data[ptr] = src[3];
			ptr++;

			_data[ptr] = src[4];
			ptr++;

			_data[ptr] = src[5];
			ptr++;

			_data[ptr] = src[6];
			ptr++;

			_data[ptr] = src[7];
			ptr++;

			return true;

		}

		/// <summary>
		/// 정해진 크기만큼의 데이터를 읽어온다
		/// </summary>
		/// <param name="ptr">읽어올 데이터의 위치</param>
		/// <param name="dest_data">읽은 값을 저장할 공간</param>
		/// <param name="size">읽어올 크기</param>
		/// <returns>성공 여부</returns>
		inline bool Read(int& ptr, void* dest_data, int size) {
#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + size > _size)
				return false;
#endif
			memmove(dest_data, &_data[ptr], size);
			ptr += size;
			return true;
		}

		/// <summary>
		/// 정해진 크기만큼의 데이터를 기록한다
		/// </summary>
		/// <param name="ptr">기록할 데이터의 위치</param>
		/// <param name="src_data_ptr">참조할 데이터가 있는 포인터</param>
		/// <param name="size">기록할 데이터의 크기</param>
		/// <returns>성공 여부</returns>
		inline bool WriteNew(int ptr, intptr_t src_data_ptr, int size) {
			void* src_data = reinterpret_cast<void*>(src_data_ptr);
#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + size > _size)
				return false;
#endif

			memmove(&_data[ptr], src_data, size);

			ptr += size;
			return true;
		}

		/// <summary>
		/// 정해진 크기만큼의 데이터를 기록한다
		/// </summary>
		/// <param name="ptr">기록할 데이터의 위치</param>
		/// <param name="src_data">참조할 데이터가 있는 공간</param>
		/// <param name="size">기록할 데이터의 크기</param>
		/// <returns>성공 여부</returns>
		inline bool Write(int& ptr, void* src_data, int size) {
#ifdef _DEBUG_TEST
			if (ptr < 0)
				return false;
			if (ptr + size > _size)
				return false;
#endif

			memmove(&_data[ptr], src_data, size);

			ptr += size;
			return true;
		}

		/// <summary>
		/// 데이터를 가져온다
		/// </summary>
		/// <returns>데이터</returns>
		inline void* GetData(int idx = 0) {
			return &(_data[idx]);
		}

		/// <summary>
		/// 정해진 위치로부터 char 데이터를 가져온다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <returns>읽어온 char type 결과</returns>
		inline char GetChar(int& ptr) {
			char data = *(char*)(&_data[ptr]);
			ptr += 1;
			return data;
		}

#ifndef _CPP
		inline char GetCharJS(int ptr) {
			char data = *(char*)(&_data[ptr]);
			return data;
		}
#endif

		/// <summary>
		/// 정해진 위치로부터 int 데이터를 가져온다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <returns>읽어온 int type 결과</returns>
		inline int GetInt(int& ptr) {
			int data = *(int*)(&_data[ptr]);
			ptr += 4;
			return data;
		}

#ifndef _CPP
		inline int GetIntJS(int ptr) {
			int data = *(int*)(&_data[ptr]);
			return data;
		}
#endif

		/// <summary>
		/// 정해진 위치로부터 float 데이터를 가져온다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <returns>읽어온 float type 결과</returns>
		inline float GetFloat(int& ptr) {
			float data = *(float*)(&_data[ptr]);
			ptr += 4;
			return data;
		}

#ifndef _CPP
		inline float GetFloatJS(int ptr) {
			float data = *(float*)(&_data[ptr]);
			return data;
		}
#endif

		/// <summary>
		/// 정해진 위치로부터 short 데이터를 가져온다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <returns>읽어온 short type 결과</returns>
		inline short GetShort(int& ptr) {
			short data = *(short*)(&_data[ptr]);
			ptr += 2;
			return data;
		}

#ifndef _CPP
		inline short GetShortJS(int ptr) {
			short data = *(short*)(&_data[ptr]);
			return data;
		}
#endif


		/// <summary>
		/// 정해진 위치로부터 double 데이터를 가져온다
		/// </summary>
		/// <param name="ptr">데이터의 위치</param>
		/// <returns>읽어온 double type 결과</returns>
		inline double GetDouble(int& ptr) {
			double data = *(double*)(&_data[ptr]);
			ptr += 8;
			return data;
		}

#ifndef _CPP
		inline double GetDoubleJS(int ptr) {
			double data = *(double*)(&_data[ptr]);
			return data;
		}
#endif

		/// <summary>
		/// 문자열의 길이를 반환한다
		/// </summary>
		/// <returns>문자열의 길이</returns>
		inline int GetWordLen() {
			if (_ptr >= _size)
				return -1;

			int temp_ptr = this->_ptr, len = 0;
			char ch = _data[temp_ptr];

			while (ch != '\0' && ch != '\n' && ch != '\r') {
				temp_ptr++;
				ch = _data[temp_ptr];
			}


			if (ch == '\r'){
				_data[temp_ptr+1] = '\0';
				len = temp_ptr - this->_ptr + 2;
			}
			else {
				len = temp_ptr - this->_ptr + 1;
			}

			_data[temp_ptr] = '\0';

			return len;
		}

		/// <summary>
		/// int 타입 데이터를 기록한다
		/// </summary>
		/// <param name="data">기록할 데이터</param>
		/// <returns>성공 여부</returns>
		inline bool WriteInt(int data);

		/// <summary>
		/// short 타입 데이터를 기록한다
		/// </summary>
		/// <param name="data">기록할 데이터</param>
		/// <returns>성공 여부</returns>
		inline bool WriteShort(short data);

		/// <summary>
		/// char 타입 데이터를 기록한다 (js에서 동작하지 않음)
		/// </summary>
		/// <param name="data">기록할 데이터</param>
		/// <returns>성공 여부</returns>
		inline bool WriteChar(char data);


		/// <summary>
		/// float 타입 데이터를 기록한다
		/// </summary>
		/// <param name="data">기록할 데이터</param>
		/// <returns>성공 여부</returns>
		inline bool WriteFloat(float data);

		/// <summary>
		/// double 타입 데이터를 기록한다
		/// </summary>
		/// <param name="data">기록할 데이터</param>
		/// <returns>성공 여부</returns>
		inline bool WriteDouble(double data);

		/// <summary>
		/// string 타입 데이터를 기록한다
		/// </summary>
		/// <param name="data">기록할 데이터</param>
		/// <returns>성공 여부</returns>
		inline bool WriteString(string data);
	};
}