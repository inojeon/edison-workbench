#include "pch.h"


using namespace std;

namespace RayCad
{

	ExtraData::ExtraData() : Geom() {
		_type = Geom::G_EXTRADATA;

		_encodedData = "";
		_data = "";
	}


	string ExtraData::GetTypeName(){
		return "ExtraData";
	}

	void ExtraData::Set(string data) {
		_data = data;
	}

	string ExtraData::Get() {
		return _data;
	}

	string ExtraData::GetEncoded() {
		return _encodedData;
	}

	void ExtraData::Encode() {
		regex re("[\\r\\n]");
		sregex_token_iterator first{ this->_data.begin(), this->_data.end(), re, -1 }, last;
		std::vector<std::string> tokens{ first, last };
		for (auto t : tokens) {
			if(t != "")
				this->_encodedData.append(t);
		}
	}

	shared_ptr<Geom> ExtraData::Clone()
	{
		auto pc = std::shared_ptr<ExtraData>(new ExtraData());
		pc->_data = _data;

		return pc;
	}


	bool ExtraData::ToBinary(MemoryBlock* data, int& ptr) {

		int size = this->GetBinarySize(true);
		
		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		if (_encodedData.size() > 0)
			data->Write(ptr, &_encodedData, _encodedData.size());
		else
			data->Write(ptr, &(_data[0]), _data.size() + 1);
		
		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}
		return true;
	}

	int ExtraData::GetBinarySize(bool bIncludeTag)
	{
		int size = 10;
		if (_encodedData.size()) {
			size += _encodedData.size() + 1;
		}
		else {
			size += _data.size() + 1;
		}

		if (bIncludeTag && _tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
				return size + tag.size() + 1;
		}

		return size;
	}

	string ExtraData::toString()
	{
		string ret;
		ret = _encodedData.size() ? _encodedData : _data;

		return ret;
	}





#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_extradata) {
		class_<ExtraData, base<Geom>>("ExtraData")
			.smart_ptr_constructor("ExtraData", &std::make_shared<ExtraData>)
			
			.function("Set", &RayCad::ExtraData::Set)
			.function("Get", &RayCad::ExtraData::Get)


			.function("Clone", &RayCad::ExtraData::Clone)
			.function("GetTypeName", &RayCad::ExtraData::GetTypeName)

			;
	}
#endif

}
