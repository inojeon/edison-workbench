#include "pch.h"


namespace RayCad {


	Cylinder ::Cylinder() {
		_type = Geom::G_CYLINDER;
		_radius = 0;

		_p1.Set(0, 0, 0);
		_p2.Set(0, 0, 0);
	}

	string Cylinder::GetTypeName() {
		return "Cylinder";
	}

	bool Cylinder::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write8(ptr, &_p1._x);
		data->Write8(ptr, &_p1._y);
		data->Write8(ptr, &_p1._z);
		data->Write8(ptr, &_p2._x);
		data->Write8(ptr, &_p2._y);
		data->Write8(ptr, &_p2._z);
		data->Write8(ptr, &_radius);
		
		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}
		return true;
	}

	int Cylinder::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr) {
			string tag = this->_tag->ToString();
			if(tag != "")
				return 66 + tag.size() + 1;
		}
		return 66;
	}


	void Cylinder::Set(cad_type p1x, cad_type p1y, cad_type p1z, cad_type p2x, cad_type p2y, cad_type p2z, cad_type radius) {

		_p1.Set(p1x, p1y, p1z);
		_p2.Set(p2x, p2y, p2z);

		_radius = radius;
	}


	double Cylinder::distance3(double x, double y, double z) {
		return 0;
	}

	shared_ptr<Geom> Cylinder::Clone()
	{
		auto cc = std::shared_ptr<Cylinder>(new Cylinder());
		cc->_id = _id;
		cc->_type = _type;
		cc->_tag = _tag;

		cc->_p1.Set(_p1);
		cc->_p2.Set(_p2);

		cc->_radius = _radius;
				
		return cc;
	}


	bool Cylinder::GeneratePreview(shared_ptr<Group> preview) {
		return false;
	}


#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_cylinder) {
		class_<RayCad::Cylinder, base<Geom>>("Cylinder")
			.smart_ptr_constructor("Cylinder", &std::make_shared<Cylinder>)

			.function("GetTypeName", &RayCad::Cylinder::GetTypeName)
			.function("GeneratePreview", &RayCad::Cylinder::GeneratePreview)
			.function("Clone", &RayCad::Cylinder::Clone)
			.function("distance3", &RayCad::Cylinder::distance3)

			.function("GetCenterX", &RayCad::Cylinder::GetCenterX)
			.function("GetCenterY", &RayCad::Cylinder::GetCenterY)
			.function("GetCenterZ", &RayCad::Cylinder::GetCenterZ)
			
			.function("Set", &RayCad::Cylinder::Set)
			.function("GetPosition1", &RayCad::Cylinder::GetPosition1)
			.function("GetPosition2", &RayCad::Cylinder::GetPosition2)
			.function("GetRadius", &RayCad::Cylinder::GetRadius)
			.function("GetBinarySize", &RayCad::Cylinder::GetBinarySize)
			;
	}

#endif


}