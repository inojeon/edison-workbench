#include "pch.h"

namespace RayCad {

	Atom::Atom() {
		_type = Geom::G_ATOM;
		_atomID = 0;
		_radius = 0.2;
	}


	void Atom::Set(cad_type x, cad_type y, cad_type z)
	{
		this->_center._x = x;
		this->_center._y = y;
		this->_center._z = z;
	}

	shared_ptr<Geom> Atom::Clone()
	{
		auto cc = std::shared_ptr<Atom>(new Atom());
		cc->_id = _id;
		cc->_center = _center;
		cc->_radius = _radius;
		cc->_atomID = _atomID;

		return cc;
	}

	string Atom::GetTypeName() {
		return "Atom";
	}

	int Atom::GetAtomNumber() {
		return _atomID;
	}

	void Atom::SetAtomNumber(int atom_number) {
		_atomID = atom_number;
	}

	void Atom::SetCharge(int charge) {
		_charge = charge;
	}

	int Atom::GetCharge() {
		return _charge;
	}


	bool Atom::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write8(ptr, &_center._x);
		data->Write8(ptr, &_center._y);
		data->Write8(ptr, &_center._z);

		
		data->Write4(ptr, &_atomID);
		data->Write4(ptr, &_charge);

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		return true;
	}


	int Atom::GetBinarySize(bool bIncludeTag)
	{
		int size = 42;

		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "")
				return size + tag.size() + 1;
		}
		return size;
	}




#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_atom) {
		class_<RayCad::Atom, base<Sphere>>("Atom")
			.smart_ptr_constructor("Atom", &std::make_shared<Atom>)

			.function("Set", &RayCad::Atom::Set)

			.function("GetCenter", &RayCad::Atom::GetCenter)
			.function("GetRadius", &RayCad::Atom::GetRadius)
			.function("GetX", &RayCad::Atom::GetX)
			.function("GetY", &RayCad::Atom::GetY)
			.function("GetZ", &RayCad::Atom::GetZ)
			.function("distance3", &RayCad::Atom::distance3)

			.function("Clone", &RayCad::Atom::Clone)

			.function("GetTypeName", &RayCad::Atom::GetTypeName)
			.function("GeneratePreview", &RayCad::Atom::GeneratePreview)
			.function("GetBinarySize", &RayCad::Atom::GetBinarySize)
			.function("GetAtomNumber", &RayCad::Atom::GetAtomNumber)
			.function("SetAtomNumber", &RayCad::Atom::SetAtomNumber)

			.function("SetCharge", &RayCad::Atom::SetCharge)
			.function("GetCharge", &RayCad::Atom::GetCharge)
			;
	}

#endif


}