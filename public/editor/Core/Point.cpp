#include "pch.h"


using namespace std;

namespace RayCad
{

	Point::Point() : Geom() {
		_type = Geom::G_POINT;
		_bbox2 = NULL;

	}


	string Point::GetTypeName(){
		return "Point";
	}

	void Point::Set(double x, double y, double z) {
		_x = x;
		_y = y;
		_z = z;
	}


	void Point::Set(Vector3 pos) {
		_x = pos._x;
		_y = pos._y;
		_z = pos._z;
	}

	double Point::GetX()
	{
		return _x;
	}

	double Point::GetY()
	{
		return _y;
	}

	double Point::GetZ()
	{
		return _z;
	}


	double Point::distance2(double x, double y) {
		return sqrt(pow(_x - x, 2) + pow(_y - y, 2));
	}


	double Point::distance3(double x, double y, double z) {
		return sqrt(pow(_x - x, 2) + pow(_y - y, 2) + pow(_z - z, 2));
	}

	double Point::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		wykobi::point3d<cad_type> pt = wykobi::make_point(_x, _y, _z);
		wykobi::line<cad_type, 3> line = wykobi::make_line(wykobi::make_ray(wykobi::make_point(ox, oy, oz), wykobi::make_vector(dx, dy, dz)));
		return wykobi::minimum_distance_from_point_to_line(pt, line);
	}

	shared_ptr<Geom> Point::Clone()
	{
		auto pc = std::shared_ptr<Point>(new Point());
		pc->_id = _id;
		pc->_type = _type;
		pc->_x = _x;
		pc->_y = _y;
		pc->_z = _z;

		return pc;
	}


	bool Point::ToBinary(MemoryBlock* data, int& ptr) {
		int size = GetBinarySize(true);

		data->Write4(ptr, &size);

		data->Write2(ptr, &_type);

		data->Write4(ptr, &_id);

		data->Write8(ptr, &_x);
		data->Write8(ptr, &_y);
		data->Write8(ptr, &_z);

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		return true;
	}

	int Point::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr)
		{
			string tag = _tag->ToString();
			if (tag != "") {
				return 34 + tag.size() + 1;
			}
		}
		return 34;
	}


	bool Point::GeneratePreview(shared_ptr<Group> preview) {
		shared_ptr<Point> elem = dynamic_pointer_cast<Point>(this->Clone());
		elem->SetID(0);
		int ret = preview->Add(elem);

		if (ret < 0)
			return false;
		return true;
	}

	shared_ptr<BoundingBox2> Point::GetBoundingBox2()
	{
		shared_ptr<BoundingBox2> boundingBox = make_shared<BoundingBox2>();
		boundingBox->Add(_x, _y, _z);
		boundingBox->_notDefined = false;

		return boundingBox;
	}

	bool Point::IsBoxIntersect(shared_ptr<BoundingBox2> bbox2)
	{
		return Geom::IsBoxContain(bbox2);
	}


	void Point::Transform(shared_ptr<Matrix4> mat)
	{
		Vector4d p(_x, _y, _z, 1);

		Vector4d p_ = mat->_mat * p;

		_x = p_.x();
		_y = p_.y();
		_z = p_.z();
	}


	void Point::GetAuxUIPoints(shared_ptr<PointList> plist)
	{
		Point* p = (Point*)this;
		plist->AddPoint(p->_x, p->_y, p->_z);
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_point) {
		class_<Point, base<Geom>>("Point")
			.smart_ptr_constructor("Point", &std::make_shared<Point>)
			
			.function("Set", select_overload<void(cad_type, cad_type, cad_type)>(&RayCad::Point::Set))
			.function("Set", select_overload<void(Vector3)>(&RayCad::Point::Set))
			.function("GetX", &RayCad::Point::GetX)
			.function("GetY", &RayCad::Point::GetY)
			.function("GetZ", &RayCad::Point::GetZ)

			.function("distance2", &RayCad::Point::distance2)
			.function("distance3", &RayCad::Point::distance3)
			.function("distanceToRay", &RayCad::Point::distanceToRay)

			.function("Clone", &RayCad::Point::Clone)
			.function("GetTypeName", &RayCad::Point::GetTypeName)
			.function("GeneratePreview", &RayCad::Point::GeneratePreview)


			.function("IsBoxIntersect", &RayCad::Point::IsBoxIntersect)

			.function("GetAuxUIPoints", &RayCad::Point::GetAuxUIPoints)
			.function("GetBinarySize", &RayCad::Point::GetBinarySize)
			.function("GetBoundingBox2", &RayCad::Point::GetBoundingBox2)
			.function("Transform", &RayCad::Point::Transform)
			;
	}
#endif

}
