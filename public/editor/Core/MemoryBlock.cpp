#include "pch.h"
#include "MemoryBlock.h"

namespace RayCad {


	void MemoryBlock::Create(int size) {
		_size = size;
		_data = new unsigned char[size];
		_ptr = 0;
	}

	unsigned int MemoryBlock::GetPtr() {
		return _ptr;
	}

	void MemoryBlock::SetPtr(unsigned int ptr) {
		_ptr = ptr;
	}

	void MemoryBlock::CreateWithString(string data) {
		int len = data.length();
		Create(len);
		memmove(_data, &data[0], len);
	}


	inline bool MemoryBlock::WriteShort(short data)
	{
		char* src = (char*)&data;
		_data[_ptr] = src[0];
		_ptr++;

		_data[_ptr] = src[1];
		_ptr++;
		return true;
	}

	inline bool MemoryBlock::WriteChar(char data)
	{
		char* src = (char*)&data;
		_data[_ptr] = src[0];
		_ptr++;

		return true;
	}

	inline bool MemoryBlock::WriteInt(int data)
	{
		char* src = (char*)&data;
		_data[_ptr] = src[0];
		_ptr++;

		_data[_ptr] = src[1];
		_ptr++;

		_data[_ptr] = src[2];
		_ptr++;

		_data[_ptr] = src[3];
		_ptr++;
		return true;
	}

	inline bool MemoryBlock::WriteFloat(float data)
	{
		char* src = (char*)&data;
		_data[_ptr] = src[0];
		_ptr++;

		_data[_ptr] = src[1];
		_ptr++;

		_data[_ptr] = src[2];
		_ptr++;

		_data[_ptr] = src[3];
		_ptr++;

		_data[_ptr] = src[4];
		_ptr++;

		return true;
	}

	inline bool MemoryBlock::WriteDouble(double data)
	{
		char* src = (char*)&data;
		_data[_ptr] = src[0];
		_ptr++;

		_data[_ptr] = src[1];
		_ptr++;

		_data[_ptr] = src[2];
		_ptr++;

		_data[_ptr] = src[3];
		_ptr++;

		_data[_ptr] = src[4];
		_ptr++;

		_data[_ptr] = src[5];
		_ptr++;

		_data[_ptr] = src[6];
		_ptr++;

		_data[_ptr] = src[7];
		_ptr++;

		return true;
	}

	inline bool MemoryBlock::WriteString(string data)
	{
		int len = data.length();
		char* src = (char*)data.c_str();
		for(int i=0; i<len; i++) {
			_data[_ptr] = src[i];
			_ptr++;
		}

		_data[_ptr] = '\0';
		_ptr++;
		
		return true;
	}

#ifndef _CPP

	val MemoryBlock::GetPointer() {
		return val(typed_memory_view(_size, _data));
	}


	EMSCRIPTEN_BINDINGS(raycad_memoryblock) {
		class_<RayCad::MemoryBlock>("MemoryBlock")
			.smart_ptr_constructor("MemoryBlock", &std::make_shared<MemoryBlock>)

			.function("GetPtr", &RayCad::MemoryBlock::GetPtr)
			.function("SetPtr", &RayCad::MemoryBlock::SetPtr)
			.function("GetSize", &RayCad::MemoryBlock::GetSize)

			.function("GetData", &RayCad::MemoryBlock::GetDataPtr, allow_raw_pointers())
			
			// .function("Write", &RayCad::MemoryBlock::Write, allow_raw_pointers())
			.function("WriteNew", &RayCad::MemoryBlock::WriteNew, allow_raw_pointers())

			.function("WriteChar", &RayCad::MemoryBlock::WriteChar)
			.function("WriteInt", &RayCad::MemoryBlock::WriteInt)
			.function("WriteShort", &RayCad::MemoryBlock::WriteShort)
			.function("WriteFloat", &RayCad::MemoryBlock::WriteFloat)
			.function("WriteDouble", &RayCad::MemoryBlock::WriteDouble)
			.function("WriteString", &RayCad::MemoryBlock::WriteString)

			.function("GetChar", &RayCad::MemoryBlock::GetCharJS)
			.function("GetShort", &RayCad::MemoryBlock::GetShortJS)
			.function("GetInt", &RayCad::MemoryBlock::GetIntJS)
			.function("GetDouble", &RayCad::MemoryBlock::GetDoubleJS)

			.function("Create", &RayCad::MemoryBlock::Create)
			.function("CreateWithString", &RayCad::MemoryBlock::CreateWithString)
			.function("GetPointer", &RayCad::MemoryBlock::GetPointer)
			;
	}

#endif



};