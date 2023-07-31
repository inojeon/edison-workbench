#include "pch.h"

namespace RayCad {

	Bond::Bond() {
		_type = Geom::G_BOND;
		_atom1ID = -1;
		_atom2ID = -1;
		_bondType = 0;
	}

	shared_ptr<Geom> Bond::Clone()
	{
		auto cc = std::shared_ptr<Bond>(new Bond());
		cc->_id = _id;
		cc->_type = _type;
		cc->_tag = _tag;

		cc->_atom1ID = _atom1ID;
		cc->_atom2ID = _atom2ID;

		return cc;
	}


	int Bond::GetBondType() {
		return _bondType;
	}

	void Bond::SetBondType(int type) {
		_bondType = type;
	}

	string Bond::GetTypeName() {
		return "Bond";
	}

	int Bond::GetAtom1ID() {
		return _atom1ID;
	}

	void Bond::SetAtom1ID(int id) {
		_atom1ID = id;
	}


	int Bond::GetAtom2ID() {
		return _atom2ID;
	}

	void Bond::SetAtom2ID(int id) {
		_atom2ID = id;
	}

	int Bond::GetBinarySize(bool bIncludeTag)
	{
		int size = 22;

		if (bIncludeTag && _tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
				return size + tag.size() + 1;
		}
		return size;
	}

	bool Bond::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write4(ptr, &_atom1ID);
		data->Write4(ptr, &_atom2ID);

		data->Write4(ptr, &_bondType);

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}
		return true;
	}



#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_bond) {
		class_<RayCad::Bond, base<Geom>>("Bond")
			.smart_ptr_constructor("Bond", &std::make_shared<Bond>)

			.function("GetTypeName", &RayCad::Bond::GetTypeName)
			.function("GeneratePreview", &RayCad::Bond::GeneratePreview)
			.function("Clone", &RayCad::Bond::Clone)
			.function("distance3", &RayCad::Bond::distance3)

			.function("GetBinarySize", &RayCad::Bond::GetBinarySize)

			.function("GetBondType", &RayCad::Bond::GetBondType)
			.function("SetBondType", &RayCad::Bond::SetBondType)


			.function("GetAtom1ID", &RayCad::Bond::GetAtom1ID)
			.function("SetAtom1ID", &RayCad::Bond::SetAtom1ID)
			.function("GetAtom2ID", &RayCad::Bond::GetAtom2ID)
			.function("SetAtom2ID", &RayCad::Bond::SetAtom2ID)

			;
	}

#endif

}