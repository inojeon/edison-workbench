#include "pch.h"

#define PI 3.14159265

#include "distance.h"

using namespace RayWycobi;

namespace RayCad {

	Arc2::Arc2() : Geom() {
		_type = Geom::G_ARC2;
		_bbox2 = NULL;
		_normal.Set(0, 0, 1);
	}


	void Arc2::Set(cad_type x, cad_type y, cad_type z, cad_type radius, cad_type st_x, cad_type st_y, cad_type st_z, cad_type ed_x, cad_type ed_y, cad_type ed_z)
	{
		_center.Set(x, y, z);

		_radius = radius;

		_pt_st._x = st_x;
		_pt_st._y = st_y;
		_pt_st._z = st_z;

		_pt_ed._x = ed_x;
		_pt_ed._y = ed_y;
		_pt_ed._z = ed_z;
	}

	void Arc2::SetNormal(cad_type nx, cad_type ny, cad_type nz)
	{
		_normal.Set(nx, ny, nz);
		_normal.Normalize();
	}

	inline double Degree2Radian(double degree)
	{
		return (degree / 180.0) * PI;
	}

	double Arc2::distance2(double x, double y)
	{
		shared_ptr<Group> g = make_shared<Group>();
		this->GeneratePreview(g);
		shared_ptr<PLine> pl = dynamic_pointer_cast<PLine>(g->Get(0));
		return pl->distance2(x, y);
	}

	double Arc2::distance3(double x, double y, double z) {
		shared_ptr<Group> g = make_shared<Group>();
		this->GeneratePreview(g);
		shared_ptr<PLine> pl = dynamic_pointer_cast<PLine>(g->Get(0));
		return pl->distance3(x, y, z);
	}

	double Arc2::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		shared_ptr<Group> g = make_shared<Group>();
		this->GeneratePreview(g);
		shared_ptr<PLine> pl = dynamic_pointer_cast<PLine>(g->Get(0));
		return pl->distanceToRay(ox, oy, oz, dx, dy, dz);
	}


	shared_ptr<Geom> Arc2::Clone()
	{
		auto cc = std::shared_ptr<Arc2>(new Arc2());
		cc->_id = _id;
		cc->_type = _type;

		cc->_center = _center;
		cc->_normal = _normal;
		cc->_radius = _radius;

		cc->_pt_st._x = _pt_st._x;
		cc->_pt_st._y = _pt_st._y;
		cc->_pt_st._z = _pt_st._z;

		cc->_pt_ed._x = _pt_ed._x;
		cc->_pt_ed._y = _pt_ed._y;
		cc->_pt_ed._z = _pt_ed._z;

		return cc;
	}


	std::string Arc2::GetTypeName() {
		return "Arc";
	}

	bool Arc2::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write8(ptr, &_center._x);
		data->Write8(ptr, &_center._y);
		data->Write8(ptr, &_center._z);

		data->Write8(ptr, &_radius);

		data->Write8(ptr, &_pt_st._x);
		data->Write8(ptr, &_pt_st._y);
		data->Write8(ptr, &_pt_st._z);

		data->Write8(ptr, &_pt_ed._x);
		data->Write8(ptr, &_pt_ed._y);
		data->Write8(ptr, &_pt_ed._z);

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

	int Arc2::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "") {
				return 114 + tag.size() + 1;
			}
		}
		return 114;
	}


	bool Arc2::GeneratePreview(shared_ptr<Group> preview) {
		int n = 200;
		auto res = make_shared<PLine>();
		res->Init(n);
		res->SetID(0);

		Vector3 _ucx = _pt_st - _center;
		_ucx.Normalize();
		Vector3 _ucy = _normal.Cross(_ucx);
		_ucy.Normalize();

		double angle_st = this->GetAngleStart();
		double angle_ed = this->GetAngleEnd();

		if (angle_ed < angle_st)
		{
			angle_ed += 360.0;
		}

		double angleDiff = angle_ed - angle_st;

		for (int i = 0; i < n - 1; i++)
		{
			double degree = i * (angleDiff / (double)(n - 1)) + angle_st;
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

		double radian = (angle_ed / 180.0) * (double)M_PI;
		double vx, vy;
		vx = cos(radian) * _radius;
		vy = sin(radian) * _radius;
		Vector3 cvx(_ucx);
		Vector3 cvy(_ucy);
		cvx.MultiplyScalar(vx);
		cvy.MultiplyScalar(vy);
		Vector3 cp = _center + cvx + cvy;
		res->SetPoint(n - 1, cp._x, cp._y, cp._z);

		int ret = preview->Add(res);

		if (ret < 0)
			return false;
		return true;
	}


	void Arc2::GetAuxUIPoints(shared_ptr<PointList> plist)
	{
		Vector3 center = GetCenter();
		plist->AddPoint(center._x, center._y, center._z);
		Vector3 start = GetStart();
		plist->AddPoint(start._x, start._y, start._z);
		Vector3 end = GetEnd();
		plist->AddPoint(end._x, end._y, end._z);
		Vector3 mp = GetMidPoint();
		plist->AddPoint(mp._x, mp._y, mp._z);
	}

	shared_ptr<BoundingBox2> Arc2::GetBoundingBox2()
	{
		shared_ptr<BoundingBox2> boundingBox2 = make_shared<BoundingBox2>();
		shared_ptr<Group> group = make_shared<Group>();
		Vector3 center = GetCenter();

		GeneratePreview(group);
			
		shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(group->Get(0));
		int len = pline->GetNumberOfPoints();
			
		if (len > 0)
			boundingBox2->_notDefined = false;

		for (int j = 0; j < len; j++) {
			boundingBox2->Add(pline->GetPoint(j)._x, pline->GetPoint(j)._y, pline->GetPoint(j)._z);
		}
			
		return boundingBox2;
	}

	void Arc2::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
		shared_ptr<Group> arcPreview = make_shared<Group>();
		GeneratePreview(arcPreview);

		int n = arcPreview->GetNumberOfChildren();
		for (int i = 0; i < n; i++) {
			shared_ptr<Geom> segment = arcPreview->Get(i);
			segment->GetIntersection(compareGeom, plist);
		}
	}

	void Arc2::Transform(shared_ptr<Matrix4> mat)
	{
		Vector3 mpt = GetMidPoint();

		//Vector4d ctr(_center._x, _center._y, _center._z, 1);
		//Vector4d nctr(_center._x + _normal._x, _center._y + _normal._y, _center._z + _normal._z, 1);

		Vector4d p1(_pt_st._x, _pt_st._y, _pt_st._z, 1);
		Vector4d p2(mpt._x, mpt._y, mpt._z, 1);
		Vector4d p3(_pt_ed._x, _pt_ed._y, _pt_ed._z, 1);

		Vector4d t_p1 = mat->_mat * p1;
		Vector4d t_p2 = mat->_mat * p2;
		Vector4d t_p3 = mat->_mat * p3;

		//Vector4d t_ctr = mat->_mat * ctr;
		//Vector4d t_nctr = mat->_mat * nctr;
		//_normal.Set(t_nctr.x() - t_ctr.x(), t_nctr.y() - t_ctr.y(), t_nctr.z() - t_ctr.z());

		SetFromThreePoint(t_p1.x(), t_p1.y(), t_p1.z(), t_p2.x(), t_p2.y(), t_p2.z(), t_p3.x(), t_p3.y(), t_p3.z());

		/*
		double angle_st = this->GetAngleStart();
		double angle_ed = this->GetAngleEnd();
		if (angle_ed < angle_st)
		{
			angle_ed += 360.0;
		}
		double angleDiff = angle_ed - angle_st;

		Vector4d center(_center._x, _center._y, 0, 1);
		Vector4d pt_st(_pt_st._x, _pt_st._y, 0, 1);
		Vector4d pt_ed(_pt_ed._x, _pt_ed._y, 0, 1);

		Vector4d t_center = mat->_mat * center;
		Vector4d t_pt_st = mat->_mat * pt_st;
		Vector4d t_pt_ed = mat->_mat * pt_ed;

		Vector3 tcc;
		Vector3 tst;
		Vector3 ted;

		tcc.Set(t_center);
		tst.Set(t_pt_st);
		ted.Set(t_pt_ed);

		Set(tcc._x, tcc._y, 0, _radius, tst._x, tst._y, 0, ted._x, ted._y, 0);

		double t_angle_st = this->GetAngleStart();
		double t_angle_ed = this->GetAngleEnd();
		if (t_angle_ed < t_angle_st)
		{
			t_angle_ed += 360.0;
		}
		double t_angleDiff = t_angle_ed - t_angle_st;

		if (abs(t_angleDiff - angleDiff) > 0.01) 
		{
			Set(tcc._x, tcc._y, 0, _radius, ted._x, ted._y, 0, tst._x, tst._y, 0);
		}
		*/

		

	}



	cad_type Arc2::GetRadius() {
		return _radius;
	}

	cad_type Arc2::GetAngleStart()
	{
		return GetAngle(_pt_st._x, _pt_st._y, _pt_st._z);
	}

	cad_type Arc2::GetAngleEnd()
	{
		return GetAngle(_pt_ed._x, _pt_ed._y, _pt_ed._z);
	}

	cad_type Arc2::GetAngleMid()
	{
		double sa = GetAngleStart();
		double ea = GetAngleEnd();
		if (sa >= ea)
		{
			ea += 360.0;
		}

		double ma = (sa + ea) * 0.5;
		if (ma > 360.0)
			ma -= 360.0;

		return ma;
	}

	cad_type Arc2::GetAngle(double x, double y, double z)
	{
		Vector4d fc(x - _center._x, y - _center._y, z - _center._z, 1);
		//fc.Normalize();
		//double rad = atan2(_ucx.Cross(fc).Length(), _ucx.Dot(fc));

		Vector3 _ucx = _pt_st - _center;
		_ucx.Normalize();
		Vector3 _ucy = _normal.Cross(_ucx);
		_ucy.Normalize();

		Matrix4 axmat;
		axmat.SetFromAxes(_ucx._x, _ucx._y, _ucx._z, _ucy._x, _ucy._y, _ucy._z, _normal._x, _normal._y, _normal._z, 0, 0, 0);
		axmat.Inverse();

		Vector4d pov = axmat._mat * fc;
		double rad = atan2(pov.y(), pov.x());
		double deg = rad / M_PI * 180.0;
		if (deg < 0)
			deg += 360.0;

		return deg;
	}

	cad_type Arc2::GetX()
	{
		return _center._x;
	}

	cad_type Arc2::GetY()
	{
		return _center._y;
	}

	cad_type Arc2::GetZ()
	{
		return _center._z;
	}


	Vector3 Arc2::GetCenter() {
		return _center;
	}


	Vector3 Arc2::GetStart() {
		return _pt_st;
	}

	cad_type Arc2::GetStartX()
	{
		return _pt_st._x;
	}

	cad_type Arc2::GetStartY()
	{
		return _pt_st._y;
	}

	cad_type Arc2::GetStartZ()
	{
		return _pt_st._z;
	}


	Vector3 Arc2::GetEnd() {
		return _pt_ed;
	}

	cad_type Arc2::GetEndX()
	{
		return _pt_ed._x;
	}

	cad_type Arc2::GetEndY()
	{
		return _pt_ed._y;
	}

	cad_type Arc2::GetEndZ()
	{
		return _pt_ed._z;
	}

	Vector3 Arc2::GetMidPoint() {
		double ma = GetAngleMid();
		double radian = (ma / 180.0) * ((double)M_PI);

		Vector3 _ucx = _pt_st - _center;
		_ucx.Normalize();
		Vector3 _ucy = _normal.Cross(_ucx);
		_ucy.Normalize();

		double vx, vy;
		vx = cos(radian) * _radius;
		vy = sin(radian) * _radius;
		Vector3 cvx(_ucx);
		Vector3 cvy(_ucy);
		cvx.MultiplyScalar(vx);
		cvy.MultiplyScalar(vy);
		Vector3 mp = _center + cvx + cvy;

		return mp;
		//return Vector3(_center._x + cos(radian) * _radius, _center._y + sin(radian) * _radius, 0);
	}

	void Arc2::Offset(double value) 
	{
		_radius = _radius + value;

		Vector3 vst = _pt_st - _center;
		vst.Normalize();
		Vector3 ved = _pt_ed - _center;
		ved.Normalize();
		vst.MultiplyScalar(_radius);
		ved.MultiplyScalar(_radius);

		_pt_st = _center + vst;
		_pt_ed = _center + ved;
	}

	Vector3 Arc2::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
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
	}

	shared_ptr<Group> Arc2::Trim(shared_ptr<Geom> refGeom, bool bTrimFirst)
	{
		shared_ptr<Group> ret = make_shared<Group>();

		if (refGeom == nullptr)
			return ret;

		if (refGeom->GetType() != G_LINE)
			return ret;

		LineSeg* pl = (LineSeg*)refGeom.get();

		double r_st = this->GetAngleStart() / 180.0 * M_PI;
		double r_ed = this->GetAngleEnd() / 180.0 * M_PI;

		shared_ptr<PointList> intpList = make_shared<PointList>();
		intpList->Init(0);
		IntersectLinesegArc(pl->_p1._x, pl->_p1._y, pl->_p2._x, pl->_p2._y, this->_center._x, this->_center._y, this->_radius, r_st, r_ed, intpList);

		if (intpList->GetNumberOfPoints() == 1)
		{
			shared_ptr<Geom> tArc = this->Clone();
			Arc2* pArc = (Arc2*)tArc.get();

			Vector3 ip = intpList->GetPoint(0);
			if (!ip.IsTooNear(_pt_st) && !ip.IsTooNear(_pt_ed))
			{
				if (bTrimFirst)
				{
					pArc->_pt_st = ip;
				}
				else
				{
					pArc->_pt_ed = ip;
				}
			}

			ret->Add(tArc);
		}
		else if (intpList->GetNumberOfPoints() == 2)
		{
			Vector3 ip1 = intpList->GetPoint(0);
			Vector3 ip2 = intpList->GetPoint(1);

			bool dgen1 = ip1.IsTooNear(_pt_st) || ip1.IsTooNear(_pt_ed);
			bool dgen2 = ip2.IsTooNear(_pt_st) || ip2.IsTooNear(_pt_ed);

			if (!dgen1 || !dgen2)
			{
				if (dgen1)
				{
					shared_ptr<Geom> tArc = this->Clone();
					Arc2* pArc = (Arc2*)tArc.get();
					if (bTrimFirst)
					{
						_pt_st = ip2;
					}
					else
					{
						_pt_ed = ip2;
					}

					ret->Add(tArc);
				}
				else if (dgen2)
				{
					shared_ptr<Geom> tArc = this->Clone();
					Arc2* pArc = (Arc2*)tArc.get();
					if (bTrimFirst)
					{
						_pt_st = ip1;
					}
					else
					{
						_pt_ed = ip1;
					}

					ret->Add(tArc);
				}
				else
				{
					shared_ptr<Geom> tArc = this->Clone();
					Arc2* pArc = (Arc2*)tArc.get();

					double sa = pArc->GetAngleStart();
					double ea = pArc->GetAngleEnd();

					double a1 = pArc->GetAngle(ip1._x, ip1._y, ip1._z);
					double a2 = pArc->GetAngle(ip2._x, ip2._y, ip2._z);

					if (sa >= ea)
					{
						ea += 360.0;
						a2 += 360.0;
					}

					if (bTrimFirst)
					{
						if (a1 < a2)
						{
							pArc->_pt_st = ip1;
							pArc->_pt_ed = ip2;
						}
						else
						{
							pArc->_pt_st = ip2;
							pArc->_pt_ed = ip1;
						}

						ret->Add(tArc);
					}
					else
					{
						shared_ptr<Geom> tArc2 = this->Clone();
						Arc2* pArc2 = (Arc2*)tArc2.get();

						if (a1 < a2)
						{
							pArc->_pt_ed = ip1;
							pArc2->_pt_st = ip2;
						}
						else
						{
							pArc->_pt_ed = ip2;
							pArc2->_pt_st = ip1;
						}

						ret->Add(tArc);
						ret->Add(tArc2);
					}
				}
			}
		}

		return ret;
	}


	void Arc2::SetFromThreePoint(double x1, double y1, double z1, double x2, double y2, double z2, double x3, double y3, double z3)
	{
		// setup local coordinate input poistions.
		double lx1, ly1, lx2, ly2, lx3, ly3, lz;
		Global::SetGeom2DUCSTransform(_normal, Vector3(0, 0, 0));
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
			/ (2 * ((y31) * (x12)-(y21) * (x13)));

		double g = ((sx13) * (y12)
			+(sy13) * (y12)
			+(sx21) * (y13)
			+(sy21) * (y13))
			/ (2 * ((x31) * (y12)-(x21) * (y13)));

		double c = -pow(lx1, 2) - pow(ly1, 2) - 2 * g * lx1 - 2 * f * ly1;

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

		this->_pt_st = Vector3(x1, y1, z1);
		this->_pt_ed = Vector3(x3, y3, z3);
		this->_radius = r;

		if (GetAngleStart() > GetAngleEnd()) {
			this->_pt_st = Vector3(x3, y3, z3);
			this->_pt_ed = Vector3(x1, y1, z1);
		}

		double deg = GetAngle(x2, y2, z2);
		if (!(GetAngleStart() < deg && deg < GetAngleEnd())) {
			Vector3 temp = this->_pt_st;
			this->_pt_st = this->_pt_ed;
			this->_pt_ed = temp;
		}

	}

	void Arc2::SetFromSER(double x1, double y1, double z1, double x2, double y2, double z2, double radius)
	{
		// setup local coordinate input poistions.
		double lx1, ly1, lx2, ly2, lz;
		Global::SetGeom2DUCSTransform(_normal, Vector3(0, 0, 0));
		Global::UCSGlobalToLocal(x1, y1, z1, lx1, ly1, lz);
		Global::UCSGlobalToLocal(x2, y2, z2, lx2, ly2, lz);

		double dx = lx2 - lx1;
		double dy = ly2 - ly1;
		double d = sqrt(dx * dx + dy * dy);
		if (radius < 0.5 * d)
			radius = 0.5 * d;

		double radsq = radius * radius;
		double q = sqrt(((lx2 - lx1) * (lx2 - lx1)) + ((ly2 - ly1) * (ly2 - ly1)));
		double x3 = (lx1 + lx2) * 0.5;
		double y3 = (ly1 + ly2) * 0.5;
		double lcx = x3 + sqrt(radsq - (q * q * 0.25)) * ((ly1 - ly2) / q);
		double lcy = y3 + sqrt(radsq - (q * q * 0.25)) * ((lx2 - lx1) / q);

		// global circle coord
		double cx, cy, cz;
		Global::UCSLocalToGlobal(lcx, lcy, lz, cx, cy, cz);
		this->_center = Vector3(cx, cy, cz);

		this->_radius = radius;
		
		this->_pt_st = Vector3(x1, y1, z1);
		this->_pt_ed = Vector3(x2, y2, z2);
	}

	string Arc2::toString()
	{
		string str = "";
		str += "center : (" + to_string(this->_center._x) + "," + to_string(this->_center._y) + "," + to_string(this->_center._z)  + ")\n";
		str += "start : (" + to_string(this->_pt_st._x) + "," + to_string(this->_pt_st._y) + "," + to_string(this->_pt_st._y) + "), angle : " + to_string(this->GetAngleStart()) + "\n";
		str += "end : (" + to_string(this->_pt_ed._x) + "," + to_string(this->_pt_ed._y) + "," + to_string(this->_pt_ed._y) + "), angle : " + to_string(this->GetAngleEnd()) + "\n";
		str += "normal : (" + to_string(this->_normal._x) + "," + to_string(this->_normal._y) + "," + to_string(this->_normal._z) + ")\n";
		return str;
	}


#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_arc2) {
		class_<RayCad::Arc2, base<Geom>>("Arc2")
			.smart_ptr_constructor("Arc2", &std::make_shared<Arc2>)

			.function("GetTypeName", &RayCad::Arc2::GetTypeName)
			.function("Clone", &RayCad::Arc2::Clone)

			.function("distance2", &RayCad::Arc2::distance2)
			.function("distance3", &RayCad::Arc2::distance3)
			.function("distanceToRay", &RayCad::Arc2::distanceToRay)

			//.function("AddCommand", &RayCad::Arc2::AddCommand)

			.function("GeneratePreview", &RayCad::Arc2::GeneratePreview)
			.function("GetAuxUIPoints", &RayCad::Arc2::GetAuxUIPoints)


			.function("Set", &RayCad::Arc2::Set)
			.function("SetNormal", &RayCad::Arc2::SetNormal)
			.function("GetX", &RayCad::Arc2::GetX)
			.function("GetY", &RayCad::Arc2::GetY)
			.function("GetZ", &RayCad::Arc2::GetZ)
			.function("GetRadius", &RayCad::Arc2::GetRadius)
			.function("GetAngleStart", &RayCad::Arc2::GetAngleStart)
			.function("GetAngleEnd", &RayCad::Arc2::GetAngleEnd)
			.function("GetBinarySize", &RayCad::Arc2::GetBinarySize)
			.function("GetStartX", &RayCad::Arc2::GetStartX)
			.function("GetStartY", &RayCad::Arc2::GetStartY)
			.function("GetStartZ", &RayCad::Arc2::GetStartZ)
			.function("GetEndX", &RayCad::Arc2::GetEndX)
			.function("GetEndY", &RayCad::Arc2::GetEndY)
			.function("GetEndZ", &RayCad::Arc2::GetEndZ)

	
			.function("GetBoundingBox2", &RayCad::Arc2::GetBoundingBox2)
			.function("Transform", &RayCad::Arc2::Transform)
			.function("Offset", &RayCad::LineSeg::Offset)

			.function("GetIntersection", &RayCad::Arc2::GetIntersection)
			.function("GetIntersectionForExtend", &RayCad::Arc2::GetIntersectionForExtend)
			
			.function("SetFromThreePoint", &RayCad::Arc2::SetFromThreePoint)
			.function("SetFromSER", &RayCad::Arc2::SetFromSER)
			;
	}

#endif
}