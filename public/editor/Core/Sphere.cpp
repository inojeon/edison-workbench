#include "pch.h"


namespace RayCad {


	Sphere::Sphere() {
		_type = Geom::G_SPHERE;
	}


	string Sphere::GetTypeName() {
		return "Sphere";
	}


	void Sphere::Set(cad_type x, cad_type y, cad_type z, cad_type radius) {
		_center.Set(x, y, z);

		_radius = radius;
	}


	double Sphere::distance3(double x, double y, double z) {
		return 0;
	}


	shared_ptr<Geom> Sphere::Clone()
	{
		auto cc = std::shared_ptr<Sphere>(new Sphere());
		cc->_id = _id;
		cc->_type = _type;
		cc->_center = _center;

		cc->_radius = _radius;

		return cc;
	}


	bool Sphere::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write8(ptr, &_center._x);
		data->Write8(ptr, &_center._y);
		data->Write8(ptr, &_center._z);

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


	int Sphere::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "")
				return 42 + tag.size() + 1;
		}
		return 42;
	}

	bool Sphere::GeneratePreview(shared_ptr<Group> preview) {
		return false;
	}

#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_sphere) {
		class_<RayCad::Sphere, base<Geom>>("Sphere")
			.smart_ptr_constructor("Sphere", &std::make_shared<Sphere>)
			
			.function("Set", &RayCad::Sphere::Set)
			.function("SetRadius", &RayCad::Sphere::SetRadius)
			
			.function("GetCenter", &RayCad::Sphere::GetCenter)
			.function("GetRadius", &RayCad::Sphere::GetRadius)
			.function("GetX", &RayCad::Sphere::GetX)
			.function("GetY", &RayCad::Sphere::GetY)
			.function("GetZ", &RayCad::Sphere::GetZ)
			.function("distance3", &RayCad::Sphere::distance3)

			.function("Clone", &RayCad::Sphere::Clone)

			.function("GetTypeName", &RayCad::Sphere::GetTypeName)
			.function("GeneratePreview", &RayCad::Sphere::GeneratePreview)
			.function("GetBinarySize", &RayCad::Sphere::GetBinarySize)
			;
	}

#endif


}