#include "pch.h"

#include "distance.h"

using namespace RayWycobi;

namespace RayCad {

	/// <summary>
	/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
	/// </summary>
	Circle::Circle() : Geom() {
		_type = Geom::G_CIRCLE;
		_bbox2 = NULL;
		_normal.Set(0, 0, 1);
	}


	/*
	void Geom2D::TransformUCS(shared_ptr<Matrix4> tr) {

		Vector4d ux4 = tr->_mat * Vector4d(_ucx._x, _ucx._y, _ucx._z, 1);
		Vector4d uy4 = tr->_mat * Vector4d(_ucy._x, _ucy._y, _ucy._z, 1);
		Vector4d uz4 = tr->_mat * Vector4d(_normal._x, _normal._y, _normal._z, 1);
		_ucx.Set(ux4.x(), ux4.y(), ux4.z());
		_ucy.Set(uy4.x(), uy4.y(), uy4.z());
		_normal.Set(uz4.x(), uz4.y(), uz4.z());

		_ucx.Normalize();
		_ucy.Normalize();
		_normal.Normalize();
	}

	void Geom2D::TransformUCSNormal(double nx, double ny, double nz) {
		Vector3 nn = Vector3(nx, ny, nz);
		Vector3 ndist = _normal - nn;
		if (ndist.Length() < 0.001)
			return;

		shared_ptr<Matrix4> mat = make_shared<Matrix4>();
		mat->SetRotateVectorFromTo(_normal._x, _normal._y, _normal._z, nn._x, nn._y, nn._z);
		TransformUCS(mat);
	}
	*/



	/// <summary>
	/// 기하 오브젝트의 타입명을 반환한다.
	/// </summary>
	/// <returns>기하 오브젝트 타입명</returns>
	string Circle::GetTypeName() {
		return "Circle";
	}


	/// <summary>
	/// 원의 중심, 반지름을 지정한다
	/// </summary>
	/// <param name="x">중심 x 좌표</param>
	/// <param name="y">중심 y 좌표</param>
	/// <param name="z">중심 z 좌표</param>
	/// <param name="radius">원의 반지름</param>
	void Circle::Set(cad_type x, cad_type y, cad_type z, cad_type radius) {
		_center.Set(x, y, z);
		_radius = radius;
	}


	void Circle::SetNormal(cad_type nx, cad_type ny, cad_type nz)
	{
		_normal.Set(nx, ny, nz);
		_normal.Normalize();
	}

	/// <summary>
	/// 2차원 상의 점과 원 사이의 거리를 구한다
	/// </summary>
	/// <param name="x">점의 x 좌표</param>
	/// <param name="y">점의 y 좌표</param>
	/// <returns>점과 원 사이의 거리</returns>
	//double Circle::distance2(double x, double y) {
	//
	//	double ret = 0;
	//	ret = sqrt(pow(_center._x - x, 2) + pow(_center._y - y, 2));
	//	ret = abs(ret - _radius);
	//
	//	return ret;
	//}

	double Circle::distance2(double x, double y)
	{
		shared_ptr<Group> g = make_shared<Group>();
		this->GeneratePreview(g);
		shared_ptr<PLine> pl = dynamic_pointer_cast<PLine>(g->Get(0));
		return pl->distance2(x, y);
	}

	double Circle::distance3(double x, double y, double z) {
		shared_ptr<Group> g = make_shared<Group>();
		this->GeneratePreview(g);
		shared_ptr<PLine> pl = dynamic_pointer_cast<PLine>(g->Get(0));
		return pl->distance3(x, y, z);
	}

	double Circle::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		shared_ptr<Group> g = make_shared<Group>();
		this->GeneratePreview(g);
		shared_ptr<PLine> pl = dynamic_pointer_cast<PLine>(g->Get(0));
		return pl->distanceToRay(ox, oy, oz, dx, dy, dz);
	}


	/// <summary>
	/// 객체를 복제한다
	/// </summary>
	/// <returns>복제된 객체의 포인터</returns>
	shared_ptr<Geom> Circle::Clone()
	{
		auto cc = std::shared_ptr<Circle>(new Circle());
		cc->_id = _id;
		cc->_type = _type;
		cc->_center = _center;
		cc->_normal = _normal;
		cc->_radius = _radius;

		return cc;
	}


	bool Circle::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write8(ptr, &_center._x);
		data->Write8(ptr, &_center._y);
		data->Write8(ptr, &_center._z);

		data->Write8(ptr, &_radius);

		data->Write8(ptr, &_normal._x);
		data->Write8(ptr, &_normal._y);
		data->Write8(ptr, &_normal._z);

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		return true;
	}

	int Circle::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "")
				return 66 + tag.size() + 1;
		}
		return 66;
	}


	/// <summary>
	/// 프리뷰 렌더링을 할 오브젝트 생성
	/// </summary>
	/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
	/// <returns>성공 여부</returns>
	bool Circle::GeneratePreview(shared_ptr<Group> preview) {
		int n = 200;
		auto res = make_shared<PLine>();
		res->Init(n);
		res->SetID(0);

		Matrix4 nvmat;
		nvmat.SetRotateVectorFromTo(0, 0, 1, _normal._x, _normal._y, _normal._z);
		Vector4d xa(1, 0, 0, 1);
		Vector4d n_xa = nvmat._mat * xa;
		Vector3 _ucx(n_xa.x(), n_xa.y(), n_xa.z());
		_ucx.Normalize();
		Vector3 _ucy = _normal.Cross(_ucx);
		_ucy.Normalize();

		for (int i = 0; i < n - 1; i++)
		{
			double degree = i * (360 / (double)(n - 1));
			double radian = (degree / 180.0) * ((double)M_PI);

			double vx, vy;
			vx = cos(radian) * _radius;
			vy = sin(radian) * _radius;
			Vector3 cvx(_ucx);
			Vector3 cvy(_ucy);
			cvx.MultiplyScalar(vx);
			cvy.MultiplyScalar(vy);
			Vector3 cp = _center + cvx + cvy;

			res->SetPoint(i, cp._x, cp._y, cp._z);
		}

		Vector3 cvx(_ucx);
		cvx.MultiplyScalar(_radius);
		Vector3 cp = _center + cvx;
		res->SetPoint(n - 1, cp._x, cp._y, cp._z);
		int ret = preview->Add(res);

		if (ret < 0)
			return false;
		return true;
	}

	/// <summary>
	/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
	/// </summary>
	/// <param name="plist">AuxUIPoints를 저장할 변수</param>
	void Circle::GetAuxUIPoints(shared_ptr<PointList> plist)
	{
		Circle* c = (Circle*)this;
		plist->AddPoint(_center._x, _center._y, _center._z);
		//plist->AddPoint(_center._x + _radius * _ucx._x, _center._y + _radius * _ucx._y, _center._z + _radius * _ucx._z);
	}

	/// <summary>
	/// 호의 중심 좌표 정보 반환
	/// </summary>
	/// <returns>호의 중심 좌표</returns>
	Vector3 Circle::GetCenter() {
		return _center;
	}

	cad_type Circle::GetX()
	{
		return _center._x;
	}

	cad_type Circle::GetY()
	{
		return _center._y;
	}

	cad_type Circle::GetZ()
	{
		return _center._z;
	}

	/// <summary>
	/// 반지름 정보를 가져온다
	/// </summary>
	/// <returns>반지름의 길이</returns>
	cad_type Circle::GetRadius() {
		return this->_radius;
	}

	shared_ptr<BoundingBox2> Circle::GetBoundingBox2()
	{
		shared_ptr<BoundingBox2> boundingBox2 = make_shared<BoundingBox2>();

		Vector3 center = GetCenter();
		boundingBox2->Add(center._x, center._y, center._z);
		boundingBox2->Enlarge(_radius, _radius, _radius);
		boundingBox2->_notDefined = false;

		return boundingBox2;
	}

	void Circle::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
		shared_ptr<Group> circlePreview = make_shared<Group>();
		GeneratePreview(circlePreview);

		int n = circlePreview->GetNumberOfChildren();
		for (int i = 0; i < n; i++) {
			shared_ptr<Geom> segment = circlePreview->Get(i);
			segment->GetIntersection(compareGeom, plist);
		}
	}

	void Circle::Transform(shared_ptr<Matrix4> mat)
	{
		Vector4d ctr(_center._x, _center._y, _center._z, 1);
		Vector4d nctr(_center._x + _normal._x, _center._y + _normal._y, _center._z + _normal._z, 1);
		Vector4d t_ctr = mat->_mat * ctr;
		Vector4d t_nctr = mat->_mat * nctr;
		_center.Set(t_ctr.x(), t_ctr.y(), t_ctr.z());

		_normal.Set(t_nctr.x() - t_ctr.x(), t_nctr.y() - t_ctr.y(), t_nctr.z() - t_ctr.z());

		Matrix4 nvmat;
		nvmat.SetRotateVectorFromTo(0, 0, 1, _normal._x, _normal._y, _normal._z);
		Vector4d xa(1, 0, 0, 1);
		Vector4d n_xa = nvmat._mat * xa;
		Vector3 _ucx(n_xa.x(), n_xa.y(), n_xa.z());
		_ucx.Normalize();
		Vector3 _ucy = _normal.Cross(_ucx);
		_ucy.Normalize();

		Vector3 cvx(_ucx);
		cvx.MultiplyScalar(_radius);
		Vector3 cvy(_ucy);
		cvy.MultiplyScalar(_radius);

		Vector3 p1 = _center + cvx;
		Vector3 p2 = _center + cvy;
		Vector3 p3 = _center - cvx;
		SetFromThreePoint(p1._x, p1._y, p1._z, p2._x, p2._y, p2._z, p3._x, p3._y, p3._z);

		//Vector4d p1(_center._x + cvx._x, _center._y + cvx._y, _center._z + cvx._z, 1);
		//Vector4d p2(_center._x + cvy._x, _center._y + cvy._y, _center._z + cvy._z, 1);
		//Vector4d p3(_center._x - cvx._x, _center._y - cvx._y, _center._z - cvx._z, 1);
		//Vector4d tp1 = mat->_mat * p1;
		//Vector4d tp2 = mat->_mat * p2;
		//Vector4d tp3 = mat->_mat * p3;
		//SetFromThreePoint(tp1.x(), tp1.y(), tp1.z(), tp2.x(), tp2.y(), tp2.z(), tp3.x(), tp3.y(), tp3.z());
	}

	void Circle::Offset(double value) 
	{
		_radius = _radius + value;
	}

	Vector3 Circle::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
	{
		double min_dist = 1e9;
		Vector3 min_point = st_pt;

		shared_ptr<Group> preview = make_shared<Group>();
		GeneratePreview(preview);
		shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(preview->Get(0));
		int n = pline->GetNumberOfPoints() - 1;
		for (int i = 0; i < n; ++i)
		{
			double dist = GetRayToLineSegmentIntersection(st_pt, dir, pline->GetPoint(i), pline->GetPoint(i + 1));
			if (dist > 0)
			{
				if (min_dist > dist)
				{
					min_dist = dist;
					min_point = Vector3(st_pt._x + dir._x * dist, st_pt._y + dir._y * dist, 0);
				}
			}
		}

		return min_point;

		/*
		wykobi::ray<double, 2> ray;
		wykobi::circle<double> circle;
		wykobi::point2d<double> start_point;
		wykobi::point2d<double> intersect_points[2];

		ray.origin = { st_pt._x, st_pt._y };
		ray.direction = wykobi::make_vector(dir._x, dir._y);

		start_point.x = st_pt._x;
		start_point.y = st_pt._y;

		circle.x = this->GetCenter()._x;
		circle.y = this->GetCenter()._y;
		circle.radius = this->GetRadius();

		wykobi::intersection_point(ray, circle, intersect_points);

		if (distance(start_point, intersect_points[0]) <= distance(start_point, intersect_points[1]))
			return Vector3(intersect_points[0].x, intersect_points[0].y, 0);
		else
			return Vector3(intersect_points[1].x, intersect_points[1].y, 0);
		*/
	}

	shared_ptr<Group> Circle::Trim(shared_ptr<Geom> refGeom, bool bTrimFirst)
	{
		shared_ptr<Group> ret = make_shared<Group>();

		if (refGeom == nullptr)
			return ret;

		if (refGeom->GetType() != G_LINE)
			return ret;

		LineSeg* pl = (LineSeg*)refGeom.get();

		shared_ptr<PointList> intpList = make_shared<PointList>();
		intpList->Init(0);
		IntersectLinesegCircle(pl->_p1._x, pl->_p1._y, pl->_p2._x, pl->_p2._y, this->_center._x, this->_center._y, this->_radius, intpList);

		if (intpList->GetNumberOfPoints() == 2)
		{
			Vector3 ip1 = intpList->GetPoint(0);
			Vector3 ip2 = intpList->GetPoint(1);

			shared_ptr<Arc2> tArc = make_shared<Arc2>();
			tArc->Set(_center._x, _center._y, _center._z, this->_radius, ip1._x, ip1._y, 0, ip2._x, ip2._y, 0);

			double a1 = tArc->GetAngleStart();
			double a2 = tArc->GetAngleEnd();

			if (a1 < a2 && bTrimFirst || a1 > a2 && !bTrimFirst)
			{
				tArc->Set(this->_center._x, this->_center._y, this->_center._z, this->_radius, ip2._x, ip2._y, 0, ip1._x, ip1._y, 0);
			}

			ret->Add(tArc);
		}

		return ret;
	}


	void Circle::SetFromTwoPoint(double x1, double y1, double z1, double x2, double y2, double z2)
	{
		Set(0, 0, 0, 0);

		// setup local coordinate input poistions.
		double lx1, ly1, lx2, ly2, lz;
		Global::SetGeom2DUCSTransform(_normal, _center);
		Global::UCSGlobalToLocal(x1, y1, z1, lx1, ly1, lz);
		Global::UCSGlobalToLocal(x2, y2, z2, lx2, ly2, lz);

		this->_radius = sqrt(pow(lx1 - lx2, 2.0) + pow(ly1 - ly2, 2.0)) * 0.5;

		// global circle coord
		double cx, cy, cz;
		Global::UCSLocalToGlobal((lx1 + lx2) * 0.5, (ly1 + ly2) * 0.5, lz, cx, cy, cz);
		this->_center = Vector3(cx, cy, cz);
	}

	void Circle::SetFromThreePoint(double x1, double y1, double z1, double x2, double y2, double z2, double x3, double y3, double z3)
	{
		Set(0, 0, 0, 0);

		// setup local coordinate input poistions.
		double lx1, ly1, lx2, ly2, lx3, ly3, lz;
		Global::SetGeom2DUCSTransform(_normal, _center);
		Global::UCSGlobalToLocal(x1, y1, z1, lx1, ly1, lz);
		Global::UCSGlobalToLocal(x2, y2, z2, lx2, ly2, lz);
		Global::UCSGlobalToLocal(x3, y3, z3, lx3, ly3, lz);

		double x12 = lx1 - lx2;
		double x13 = lx1 - lx3;

		double y12 = ly1 - ly2;
		double y13 = ly1 - ly3;

		double y31 = ly3 - ly1;
		double y21 = ly2 - ly1;

		double x31 = lx3 - lx1;
		double x21 = lx2 - lx1;

		double sx13 = pow(lx1, 2) - pow(lx3, 2);
		double sy13 = pow(ly1, 2) - pow(ly3, 2);

		double sx21 = pow(lx2, 2) - pow(lx1, 2);
		double sy21 = pow(ly2, 2) - pow(ly1, 2);

		double f = ((sx13) * (x12)
			+(sy13) * (x12)
			+(sx21) * (x13)
			+(sy21) * (x13))
			/ (2.0 * ((y31) * (x12)-(y21) * (x13)));

		double g = ((sx13) * (y12)
			+(sy13) * (y12)
			+(sx21) * (y13)
			+(sy21) * (y13))
			/ (2.0 * ((x31) * (y12)-(x21) * (y13)));

		double c = -pow(lx1, 2) - pow(ly1, 2) - 2.0 * g * lx1 - 2.0 * f * ly1;

		// x^2 + y^2 + 2*g*x + 2*f*y + c = 0
		// 중심점 = (x = -g, y = -f), 반지름 = r
		// r^2 = g^2 + f^2 - c
		double x = -g;
		double y = -f;
		double sqr_of_r = x * x + y * y - c;

		double r = sqrt(sqr_of_r);

	
		// global circle coord
		double cx, cy, cz;
		Global::UCSLocalToGlobal(x, y, lz, cx, cy, cz);
		this->_center = Vector3(cx, cy, cz);

		this->_radius = r;
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_circle) {
		class_<Circle, base<Geom>>("Circle")
			.smart_ptr_constructor("Circle", &std::make_shared<Circle>)

			.function("GetTypeName", &RayCad::Circle::GetTypeName)

			.function("Clone", &RayCad::Circle::Clone)

			.function("distance2", &RayCad::Circle::distance2)
			.function("distance3", &RayCad::Circle::distance3)
			.function("distanceToRay", &RayCad::Circle::distanceToRay)


			//.function("AddCommand", &RayCad::Circle::AddCommand)

			.function("GeneratePreview", &RayCad::Circle::GeneratePreview)
			.function("GetAuxUIPoints", &RayCad::Circle::GetAuxUIPoints)



			.function("Set", &RayCad::Circle::Set)
			.function("SetNormal", &RayCad::Circle::SetNormal)
			.function("GetX", &RayCad::Circle::GetX)
			.function("GetY", &RayCad::Circle::GetY)
			.function("GetZ", &RayCad::Circle::GetZ)
			.function("GetRadius", &RayCad::Circle::GetRadius)
			.function("GetBinarySize", &RayCad::Circle::GetBinarySize)

			.function("GetBoundingBox2", &RayCad::Circle::GetBoundingBox2)
			.function("Transform", &RayCad::Circle::Transform)
			.function("Offset", &RayCad::Circle::Offset)

			.function("GetIntersection", &RayCad::Circle::GetIntersection)
			.function("GetIntersectionForExtend", &RayCad::Circle::GetIntersectionForExtend)

			.function("SetFromThreePoint", &RayCad::Circle::SetFromThreePoint)
			.function("SetFromTwoPoint", &RayCad::Circle::SetFromTwoPoint)
			;
	}
#endif


}