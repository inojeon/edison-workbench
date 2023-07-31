#include "pch.h"
using namespace std;


namespace RayCad
{

	PointList::PointList() : Geom() {
		_type = Geom::G_POINTLIST;
		_bbox2 = NULL;
	}


	string GetTypeName(){
		return "PointList";
	}
	

	void PointList::Init(int num_points) {
		_points.clear();

		for (int i = 0; i < num_points; i++) {
			_points.push_back(0);
			_points.push_back(0);
			_points.push_back(0);
		}		
	}



	Vector3 PointList::GetPoint(int index) {
		int idx = index * 3;
		return Vector3::Create(_points[idx + 0], _points[idx + 1], _points[idx + 2]);
	}


	int PointList::AddPoint(cad_type x, cad_type y, cad_type z) {
		int idx = _points.size() / 3;
		_points.push_back(x);
		_points.push_back(y);
		_points.push_back(z);

		return idx;
	}


	bool PointList::SetPoint(int index, cad_type x, cad_type y, cad_type z) {
		if (index * 3 >= _points.size()) {
			//return false;
			while ((index+1) * 3 >= _points.size()) {
				_points.push_back(0);
			}
		}
		_points[index * 3 + 0] = x;
		_points[index * 3 + 1] = y;
		_points[index * 3 + 2] = z;
		
		return true;
	}


	int PointList::GetNumberOfPoints() {
		return (int)_points.size()/3;
	}


	double PointList::distance2(double x, double y){
		wykobi::point2d<cad_type> point = wykobi::make_point<cad_type>(x,y);
		cad_type result = DBL_MAX, curDist = 0;

		int num = GetNumberOfPoints();
		for(int i=0; i< num; ++i){
			curDist = wykobi::distance(point, wykobi::make_point<cad_type>(_points[i * 3], _points[i * 3 + 1]));
			if (curDist < result)
				result = curDist;
		}

		return result;
	}

	double PointList::distance3(double x, double y, double z) {
		wykobi::point3d<cad_type> point = wykobi::make_point<cad_type>(x, y, z);
		cad_type result = DBL_MAX, curDist = 0;

		int num = GetNumberOfPoints();
		for (int i = 0; i < num; ++i) {
			curDist = wykobi::distance(point, wykobi::make_point<cad_type>(_points[i * 3], _points[i * 3 + 1], _points[i * 3 + 2]));
			if (curDist < result)
				result = curDist;
		}

		return result;
	}

	double PointList::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {

		wykobi::line<cad_type, 3> line = wykobi::make_line(wykobi::make_ray(wykobi::make_point(ox, oy, oz), wykobi::make_vector(dx, dy, dz)));
		cad_type result = DBL_MAX, curDist = 0;

		int num = GetNumberOfPoints();
		for (int i = 0; i < num; ++i) {
			wykobi::point3d<cad_type> pt = wykobi::make_point(_points[i * 3], _points[i * 3 + 1], _points[i * 3 + 2]);
			curDist = wykobi::minimum_distance_from_point_to_line(pt, line);
			if (curDist < result)
				result = curDist;
		}

		return result;
	}


	shared_ptr<Geom> PointList::Clone()
	{
		auto pls = std::shared_ptr<PointList>(new PointList());
		pls->_id = _id;
		pls->_type = _type;


		int num = GetNumberOfPoints();
		for (int i = 0; i < num; ++i) {
			cad_type v = _points[i];
			pls->_points.push_back(v);
		}
			
		return pls;
	}

	string PointList::GetTypeName(){
		return "PointList";
	}


	bool PointList::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);
		int numOfPoints = _points.size()/3;
		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);
		data->Write4(ptr, &(numOfPoints));
		for (int i = 0; i < numOfPoints; i++)
		{
			data->Write8(ptr, &_points[i*3]);
			data->Write8(ptr, &_points[i*3+1]);
			data->Write8(ptr, &_points[i*3+2]);
		}
		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}		
		
		return true;
	}

	int PointList::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "") {
				return 14 + tag.size() + 1 + _points.size() * 8;
			}
		}
		return 14 + _points.size() * 8;
	}


	bool PointList::GeneratePreview(shared_ptr<Group> preview)
	{
		auto res = make_shared<PointList>();
		int n = this->GetNumberOfPoints();
		res->Init(n);
		res->SetID(0);

		for (int i = 0; i < n; i++)
		{
			res->SetPoint(i, _points[i * 3], _points[i * 3 + 1], _points[i * 3 + 2]);
		}

		int ret = preview->Add(res);

		if (ret < 0)
			return false;
		return true;
	}


	void PointList::GetAuxUIPoints(shared_ptr<PointList> plist)
	{
		int n = GetNumberOfPoints();
		for (int i = 0; i < n; i++) {
			auto a = GetPoint(i);
			plist->AddPoint(a._x, a._y, a._z);
		}
	}


	shared_ptr<BoundingBox2> PointList::GetBoundingBox2()
	{
		shared_ptr<BoundingBox2> boundingBox = make_shared<BoundingBox2>();
		int n = GetNumberOfPoints();
		for (int i = 0; i < n; i++)
		{
			Vector3 p = GetPoint(i);
			boundingBox->Add(p._x, p._y, p._z);
		}
		if (n > 0)
			boundingBox->_notDefined = false;

		return boundingBox;
	}

	bool PointList::IsBoxIntersect(shared_ptr<BoundingBox2> bbox2)
	{
		Vector3 temp;
		shared_ptr<Point> p = make_shared<Point>();

		for (int i = 0; i < GetNumberOfPoints(); i++) {
			temp = GetPoint(i);
			p->Set(temp._x, temp._y, temp._z);
			if (p->IsBoxIntersect(bbox2))
				return true;
		}
		return false;
	}

	void PointList::Transform(shared_ptr<Matrix4> mat)
	{
		int n = GetNumberOfPoints();
		for (int i = 0; i < n; ++i) {
			Vector3 t = GetPoint(i);
			Vector4d p(t._x, t._y, t._z, 1);
			Vector4d p_ = mat->_mat * p;
			SetPoint(i, p_.x(), p_.y(), p_.z());
		}
	}

	void PointList::Offset(double value) {

		int n = GetNumberOfPoints();
		vector<Vector3> offPoints;

		bool bClosed = GetPoint(0).IsTooNear(GetPoint(n - 1));

		for (int i = 0; i < n; i++) 
		{
			Vector3 p = GetPoint(i);
			
			Vector3 d1, d2;
			
			bool b1 = false;
			bool b2 = false;

			if (i > 0 || bClosed)
			{
				b1 = true;
				Vector3 pp;
				if (i == 0)
					pp = GetPoint(n - 1);
				else
					pp = GetPoint(i - 1);
				Vector3 ldir = pp - p;
				ldir.Normalize();
				//Vector4d ld(ldir._x, ldir._y, ldir._z, 1);
				//Matrix4 mat;
				//mat.SetRotate(0, 0, 0, -M_PI_2);
				//Vector4d odir = mat._mat * ld;

				d1._x = ldir._x;
				d1._y = ldir._y;
				d1._z = ldir._z;

				//p._x += odir.x() * value;
				//p._y += odir.y() * value;
				//p._z += odir.z() * value;
			}

			if (i < (n - 1) || bClosed)
			{
				b2 = true;
				Vector3 pp;
				if (i >= (n-1))
					pp = GetPoint(0);
				else
					pp = GetPoint(i + 1);
				Vector3 ldir = pp - p;
				ldir.Normalize();
				//Vector4d ld(ldir._x, ldir._y, ldir._z, 1);
				//Matrix4 mat;
				//mat.SetRotate(0, 0, 0, -M_PI_2);
				//Vector4d odir = mat._mat * ld;

				d2._x = ldir._x;
				d2._y = ldir._y;
				d2._z = ldir._z;

				//p._x += odir.x() * value;
				//p._y += odir.y() * value;
				//p._z += odir.z() * value;
			}

			if (b1 && b2)
			{
				double mg = 1.0;
				double ar = acos(d1.Dot(d2)) * 180.0 / M_PI;
				Vector3 cd = d1.Cross(d2);
				if (ar > 90)
				{
					mg = 1.0 / cos((ar - 90) * M_PI / 180.0);
				}
				else
				{
					mg = 1.0 / cos((90 - ar) * M_PI / 180.0);
				}

				if (cd._z < 0.0)
					mg = -mg;

				double len = value * mg;

				p._x += d1._x * len;
				p._y += d1._y * len;
				p._z += d1._z * len;

				p._x += d2._x * len;
				p._y += d2._y * len;
				p._z += d2._z * len;
			}
			else if (b1)
			{
				Vector4d ld(d1._x, d1._y, d1._z, 1);
				Matrix4 mat;
				mat.SetRotateAngleAxis(0, 0, 0, M_PI_2, 0, 0, 1);
				Vector4d odir = mat._mat * ld;
				p._x += odir.x() * value;
				p._y += odir.y() * value;
				p._z += odir.z() * value;
			}
			else if (b2)
			{
				Vector4d ld(d2._x, d2._y, d2._z, 1);
				Matrix4 mat;
				mat.SetRotateAngleAxis(0, 0, 0, -M_PI_2, 0, 0, 1);
				Vector4d odir = mat._mat * ld;
				p._x += odir.x() * value;
				p._y += odir.y() * value;
				p._z += odir.z() * value;
			}

			offPoints.push_back(p);
		}

		for (int i = 0; i < n; i++)
		{
			SetPoint(i, offPoints[i]._x, offPoints[i]._y, offPoints[i]._z);
		}
	}

	string PointList::toString()
	{
		string str = "";

		int n = this->GetNumberOfPoints();
		Vector3 p;
		for (int i = 0; i < n; ++i) {
			p = this->GetPoint(i);
			str += to_string(i) + "th : " + "(" + to_string(p._x) + ", " + to_string(p._y) + ", " + to_string(p._z) + ")\n";
		}
		return str;
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_pointlist) {
		class_<PointList, base<Geom>>("PointList")
			.smart_ptr_constructor("PointList", &std::make_shared<PointList>)
			
			.function("Init", &RayCad::PointList::Init)
			.function("Transform", &RayCad::PointList::Transform)
			.function("Offset", &RayCad::PointList::Offset)

			.function("GetNumberOfPoints", &RayCad::PointList::GetNumberOfPoints)

			.function("GetPoint", &RayCad::PointList::GetPoint)
			.function("SetPoint", &RayCad::PointList::SetPoint)
			.function("AddPoint", &RayCad::PointList::AddPoint)
			.function("distance2", &RayCad::PointList::distance2)
			.function("distance3", &RayCad::PointList::distance3)
			.function("distanceToRay", &RayCad::PointList::distanceToRay)

			.function("Clone", &RayCad::PointList::Clone)
			.function("GetTypeName", &RayCad::PointList::GetTypeName)
			.function("GeneratePreview", &RayCad::PointList::GeneratePreview)
			.function("GetAuxUIPoints", &RayCad::PointList::GetAuxUIPoints)
			.function("GetBinarySize", &RayCad::PointList::GetBinarySize)

			.function("GetBoundingBox2", &RayCad::PointList::GetBoundingBox2)

			.function("IsBoxIntersect", &RayCad::PointList::IsBoxIntersect)
			;
	}
#endif

}