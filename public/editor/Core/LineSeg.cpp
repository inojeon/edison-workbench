#include "pch.h"
#include "distance.h"

using namespace wykobi;
using namespace RayWycobi;

namespace RayCad{


	LineSeg::LineSeg() : Geom() {
		_type = Geom::G_LINE;
		_p1.Set(0, 0, 0);
		_p2.Set(0, 0, 0);

		_bbox2 = NULL;
	}


	Vector3 LineSeg::Get(int index) {
		if (index == 0)
			return _p1;
		return _p2;
	}


	void LineSeg::Set(double x1, double y1, double z1, double x2, double y2, double z2) {

		_p1.Set(x1, y1, z1);
		_p2.Set(x2, y2, z2);

	}


	void LineSeg::Set(Vector3 p1, Vector3 p2) {
		_p1 = p1;
		_p2 = p2;
	}
	

	
	/*
	void Line::Set(shared_ptr<PointList> plist, double x1, double y1, double z1, double x2, double y2, double z2) {

		_plist = plist;
		_from = _plist->Alloc(1);
		_to = _plist->Alloc(1);

		cad_type* pfrom = _plist->GetPoint(_from);
		cad_type* pto = _plist->GetPoint(_to);

		pfrom[0] = x1;
		pfrom[1] = y1;
		pfrom[2] = z1;

		pto[0] = x2;
		pto[1] = y2;
		pto[2] = z2;

	}
	
	
	
	void Line::SetPList(shared_ptr<PointList> plist)
	{
		//_plist = plist;
	}
	*/


	double LineSeg::distance2(double x, double y) {

		point2d<cad_type> p1 = make_point<cad_type>(x, y);
		wykobi::segment<cad_type, 2> line;
		
		line[0][0] = _p1._x;
		line[0][1] = _p1._y;

		line[1][0] = _p2._x;
		line[1][1] = _p2._y;

		point2d<cad_type> p2 = closest_point_on_segment_from_point(line, p1);

		return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
	}

	double LineSeg::distance3(double x, double y, double z) {		
		
		point3d<cad_type> p1 = make_point<cad_type>(x, y, z);
		wykobi::segment<cad_type, 3> line;
		
		line[0][0] = _p1._x;
		line[0][1] = _p1._y;
		line[0][2] = _p1._z;

		line[1][0] = _p2._x;
		line[1][1] = _p2._y;
		line[1][2] = _p2._z;
		
		point3d<cad_type> p2 = closest_point_on_segment_from_point(line, p1);
		return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2) + pow(p1.z - p2.z, 2));
	}
	
	double LineSeg::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		Vector3 ro(ox, oy, oz);
		Vector3 rd(dx, dy, dz);
		Vector3 l1(_p1._x, _p1._y, _p1._z);
		Vector3 l2(_p2._x, _p2._y, _p2._z);

		return DistRaySegment3(ro, rd, l1, l2);
	}


	shared_ptr<Geom> LineSeg::Clone()
	{
		auto cls = std::shared_ptr<LineSeg>(new LineSeg());
		cls->_id = _id;
		cls->_type = _type;
		cls->_p1 = _p1;
		cls->_p2 = _p2;
		
		return cls;
	}

	std::string LineSeg::GetTypeName(){
		return "LineSeg";
	}


	bool LineSeg::ToBinary(MemoryBlock* data, int& ptr)
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

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		return true;
	}

	int LineSeg::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "") {
				return 58 + tag.size() + 1;
			}
		}
		return 58;
	}


	bool LineSeg::GeneratePreview(shared_ptr<Group> preview) {
		shared_ptr<LineSeg> elem = dynamic_pointer_cast<LineSeg>(this->Clone());
		elem->SetID(0);
		int ret = preview->Add(elem);
		
		if (ret < 0)
			return false;
		return true;
	}


	void LineSeg::GetAuxUIPoints(shared_ptr <PointList> plist) {

		plist->AddPoint(_p1._x, _p1._y, _p1._z);
		plist->AddPoint(_p2._x, _p2._y, _p2._z);
		plist->AddPoint((_p1._x + _p2._x) / 2, (_p1._y + _p2._y) / 2, (_p1._z + _p2._z) / 2);
		
		return;
	}

	shared_ptr<BoundingBox2> LineSeg::GetBoundingBox2()
	{
			shared_ptr<BoundingBox2> boundingBox2 = make_shared<BoundingBox2>();

			Vector3 p1, p2;
			p1 = Get(0);
			p2 = Get(1);
			boundingBox2->Add(p1._x, p1._y, p1._z);
			boundingBox2->Add(p2._x, p2._y, p2._z);
			boundingBox2->_notDefined = false;

			return boundingBox2;
	}

	bool LineSeg::IsBoxIntersect(shared_ptr<BoundingBox2> bbox2)
	{
		double	coordX[2] = { bbox2->_minCoord._x, bbox2->_maxCoord._x },
				coordY[2] = { bbox2->_minCoord._y, bbox2->_maxCoord._y };
		
		// 포함 관계 확인
		if (IsBoxContain(bbox2))
			return true;

		// 교차 확인
		wykobi::segment<double, 2> segment, lineSeg;
		shared_ptr<PLine> pline = make_shared<PLine>();

		pline->AddPoint(coordX[0], coordY[0], 0);
		pline->AddPoint(coordX[0], coordY[1], 0);
		pline->AddPoint(coordX[1], coordY[1], 0);
		pline->AddPoint(coordX[1], coordY[0], 0);

		lineSeg[0].x = _p1._x;
		lineSeg[0].y = _p1._y;
		lineSeg[1].x = _p2._x;
		lineSeg[1].y = _p2._y;

		for (int i = 0; i < 4; i++)
		{
			Vector3 p1 = pline->GetPoint(i % 4), p2 = pline->GetPoint((i + 1) % 4);
			segment[0].x = p1._x;
			segment[0].y = p1._y;
			segment[1].x = p2._x;
			segment[1].y = p2._y;

			if (wykobi::intersect(segment, lineSeg)) {
				return true;
			}
		}

		return false;
	}

	void LineSeg::Transform(shared_ptr<Matrix4> mat) {
		Vector4d p1(_p1._x, _p1._y, _p1._z,1);
		Vector4d p2(_p2._x, _p2._y, _p2._z,1);

		Vector4d p1_ = mat->_mat * p1;
		Vector4d p2_ = mat->_mat * p2;

		_p1.Set(p1_);
		_p2.Set(p2_);
	}

	void LineSeg::Offset(double value) {

		Vector3 ldir = _p2 - _p1;
		ldir.Normalize();

		Vector4d ld(ldir._x, ldir._y, ldir._z, 1);

		Matrix4 mat;
		mat.SetRotateAngleAxis(0, 0, 0, -M_PI_2, 0, 0, 1);

		Vector4d odir = mat._mat * ld;

		std::shared_ptr<Matrix4> mat_off = std::make_shared<Matrix4>();
		mat_off->SetTranslate(value * odir.x(), value * odir.y(), value * odir.z());
		Transform(mat_off);
	}

	void LineSeg::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
		shared_ptr<Group> comparePreview = make_shared<Group>();
		compareGeom->GeneratePreview(comparePreview);

		auto p1 = this->Get(0);
		auto p2 = this->Get(1);

		for (int i = 0; i < comparePreview->GetNumberOfChildren(); ++i) {
			if (comparePreview->Get(i)->GetType() != G_PLINE && comparePreview->Get(i)->GetType() != G_LINE) {
				continue;
			}
			if (comparePreview->Get(i)->GetType() == G_LINE) {
				shared_ptr<LineSeg> line = dynamic_pointer_cast<LineSeg>(comparePreview->Get(i));
				auto q1 = line->Get(0);
				auto q2 = line->Get(1);

				Eigen::Vector3f DP(p2._x, p2._y, p2._z);
				Eigen::Vector3f DQ(q2._x, q2._y, q2._z);
				Eigen::Vector3f P0(p1._x, p1._y, p1._z);
				Eigen::Vector3f Q0(q1._x, q1._y, q1._z);
				Eigen::Vector3f PQ = Q0 - P0;

				double a = DP.dot(DP);
				double b = DP.dot(DQ);
				double c = DQ.dot(DQ);
				double d = DP.dot(PQ);
				double e = DQ.dot(PQ);

				double DD = a * c - b * b;
				double tt = (b * e - c * d) / DD;
				double uu = (a * e - b * d) / DD;

				Eigen::Vector3f Pi = P0 + tt * DP;
				Eigen::Vector3f Qi = Q0 + uu * DQ;
				double l2 = sqrt(pow(Pi(0) - Qi(0), 2) + pow(Pi(1) - Qi(1), 2) + pow(Pi(2) - Qi(2), 2));

				plist->AddPoint(Pi(0), Pi(1), Pi(2));
			}
			else {
				shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(comparePreview->Get(i));
				for (int j = 0; j < pline->GetNumberOfPoints() - 1; ++j) {
					auto q1 = pline->GetPoint(j);
					auto q2 = pline->GetPoint(j + 1);

					Eigen::Vector3f DP(p2._x, p2._y, p2._z);
					Eigen::Vector3f DQ(q2._x, q2._y, q2._z);
					Eigen::Vector3f P0(p1._x, p1._y, p1._z);
					Eigen::Vector3f Q0(q1._x, q1._y, q1._z);
					Eigen::Vector3f PQ = Q0 - P0;

					double a = DP.dot(DP);
					double b = DP.dot(DQ);
					double c = DQ.dot(DQ);
					double d = DP.dot(PQ);
					double e = DQ.dot(PQ);

					double DD = a * c - b * b;
					double tt = (b * e - c * d) / DD;
					double uu = (a * e - b * d) / DD;

					Eigen::Vector3f Pi = P0 + tt * DP;
					Eigen::Vector3f Qi = Q0 + uu * DQ;
					double l2 = sqrt(pow(Pi(0) - Qi(0), 2) + pow(Pi(1) - Qi(1), 2) + pow(Pi(2) - Qi(2), 2));

					plist->AddPoint(Pi(0), Pi(1), Pi(2));
				}
			}
		}
		return;
	}

	Vector3 LineSeg::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
	{
		double dist = GetRayToLineSegmentIntersection(st_pt, dir, _p1, _p2);
		if (dist > 0)
		{
			Vector3 ex(st_pt._x + dir._x * dist, st_pt._y + dir._y * dist, 0);
			return ex;
		}

		dist = GetRayToLineSegmentIntersection(st_pt, dir, _p2, _p1);
		if (dist > 0)
		{
			Vector3 ex(st_pt._x + dir._x * dist, st_pt._y + dir._y * dist, 0);
			return ex;
		}

		return st_pt;

		/*
		wykobi::ray<double, 2> ray;
		wykobi::line<double, 2> line;
		wykobi::segment<double, 2> segment;
		wykobi::point2d<double> point, min_point;
		double min_dist = 1e9;

		ray.origin = { st_pt._x, st_pt._y };
		ray.direction = wykobi::make_vector(dir._x, dir._y);

		line[0] = { st_pt._x, st_pt._y };
		line[1] = { st_pt._x + dir._x, st_pt._y + dir._y };

		segment[0] = { Get(0)._x, Get(0)._y };
		segment[1] = { Get(1)._x, Get(1)._y };

		if (wykobi::intersect(ray, segment)) 
		{
			point = wykobi::intersection_point(segment, line);
			if (distance(point, ray.origin) < min_dist) 
			{
				min_dist = distance(point, ray.origin);
				min_point = point;
			}
			else
			{
				min_point.x = st_pt._x;
				min_point.y = st_pt._y;
			}
		}*/
	}

	
	shared_ptr<Group> LineSeg::Trim(shared_ptr<Geom> refGeom, bool bTrimFirst) 
	{
		shared_ptr<Group> ret = make_shared<Group>();

		if (refGeom == nullptr)
			return ret;

		switch (refGeom->GetType())
		{
			case G_LINE:
			{
				LineSeg* pl = (LineSeg*)refGeom.get();

				shared_ptr<Geom> tObj = this->Clone();

				double ix, iy;
				if (GetIntersectionLineLine(_p1._x, _p1._y, _p2._x, _p2._y, pl->_p1._x, pl->_p1._y, pl->_p2._x, pl->_p2._y, &ix, &iy))
				{
					Vector3 ip(ix, iy, 0);
					if (!ip.IsTooNear(_p1) && !ip.IsTooNear(_p2))
					{
						if (bTrimFirst)
						{
							LineSeg* line = (LineSeg*)tObj.get();
							line->_p1 = ip;
						}
						else
						{
							LineSeg* line = (LineSeg*)tObj.get();
							line->_p2 = ip;
						}
					}
				}

				ret->Add(tObj);
			}
			break;

			case G_POINT:
			{
				Point* p = (Point*)refGeom.get();

				shared_ptr<Geom> tObj = this->Clone();

				double ix, iy;
				if (IsIntersectLinePoint(_p1._x, _p1._y, _p2._x, _p2._y, p->GetX(), p->GetY())) 
				{
					if (bTrimFirst)
					{
						LineSeg* line = (LineSeg*)tObj.get();
						line->_p1 = Vector3(p->GetX(), p->GetY(), 0);
					}
					else
					{
						LineSeg* line = (LineSeg*)tObj.get();
						line->_p2 = Vector3(p->GetX(), p->GetY(), 0);
					}
				}

				ret->Add(tObj);
			}
			break;
		}


		return ret;
	}
	
	
	void LineSeg::Extend(shared_ptr<Geom> refGeom) {
		
		if (refGeom == nullptr)
			return;

		Vector3 d1 = _p2 - _p1;
		d1.Normalize();
		Vector3 d2 = _p1 - _p2;
		d2.Normalize();

		Vector3 _e1 = refGeom->GetIntersectionForExtend(_p2, d1);
		Vector3 _e2 = refGeom->GetIntersectionForExtend(_p1, d2);

		bool bHasExt1 = !_e1.IsTooNear(_p2);
		bool bHasExt2 = !_e2.IsTooNear(_p1);

		if (bHasExt1 && bHasExt2)
		{
			double dist_e1 = (_e1 - _p2).Length();
			double dist_e2 = (_e2 - _p1).Length();
			if (dist_e1 < dist_e2)
			{
				_p2 = _e1;
			}
			else
			{
				_p1 = _e2;
			}
		}
		else if (bHasExt1)
		{
			_p2 = _e1;
		}
		else if (bHasExt2)
		{
			_p1 = _e2;
		}
	}

	shared_ptr<Group> LineSeg::Trim(shared_ptr<Group> target, shared_ptr<Point> origin)
	{
		shared_ptr<Group> res = make_shared<Group>();
		shared_ptr<PointList> plist = make_shared<PointList>();

		GetIntersectionPointList(target, plist, shared_from_this());
	
		// 현재 plist에 모든 교점이 저장되어 있다.
		// st_pt를 0으로 ed_pt를 1로 두고 plist 점들의 상대적 위치를 계산해보자
		
		// standard : 마우스 상대 위치
		// tempPortion : 현재 비교하고 있는 교점의 상대 위치
		double standard = GetPortion(Vector3(origin->GetX(), origin->GetY(), origin->GetZ()));
		double tempPortion = 0.0, leftPortion = 0.0, rightPortion = 1.0, temp;
		Vector3 lpt = this->Get(0), rpt = this->Get(1);
		for (int i = 0; i < plist->GetNumberOfPoints(); ++i) {			
			tempPortion = GetPortion(plist->GetPoint(i));
			
			if (tempPortion < standard) {
				if (leftPortion < tempPortion) {
					leftPortion = tempPortion;
					lpt = plist->GetPoint(i);		
				}
			}
			else {
				if (rightPortion > tempPortion) {
					rightPortion = tempPortion;
					rpt = plist->GetPoint(i);
				}
			}
		}

		if (leftPortion < 0.0001 && rightPortion > 0.9999) {
			return res;
		}
		else {
			if (leftPortion >= 0.0001) {
				shared_ptr<LineSeg> leftSegment = make_shared<LineSeg>();
				leftSegment->Set(lpt._x, lpt._y, lpt._z, this->_p1._x, this->_p1._y, this->_p1._z);
				res->Add(leftSegment);
			}
			if (rightPortion <= 0.9999) {
				shared_ptr<LineSeg> rightSegment = make_shared<LineSeg>();
				rightSegment->Set(rpt._x, rpt._y, rpt._z, this->_p2._x, this->_p2._y, this->_p2._z);
				res->Add(rightSegment);
			}
		}

		return res;
	}

	double LineSeg::GetPortion(Vector3 point)
	{
		double n = 0;
		double x = abs(this->Get(0)._x - this->Get(1)._x);
		double y = abs(this->Get(0)._y - this->Get(1)._y);
		double z = abs(this->Get(0)._z - this->Get(1)._z);

		if (x >= y && x >= z) {
			n = (point._x - this->Get(0)._x) / (this->Get(1)._x - this->Get(0)._x);
		}
		else if (y >= x && y >= z) {
			n = (point._y - this->Get(0)._y) / (this->Get(1)._y - this->Get(0)._y);
		}
		else {
			n = (point._z - this->Get(0)._z) / (this->Get(1)._z - this->Get(0)._z);
		}

		return n;
	}

	

	string LineSeg::toString()
	{
		string ret;
		ret = "p1(" + to_string(_p1._x) + "," + to_string(_p1._y) + "," + to_string(_p1._z) + ")" +
			" p2(" + to_string(_p2._x) + "," + to_string(_p2._y) + "," + to_string(_p2._z) + ")";
		
		return ret;
	}

	/*
	void LineSeg::Align(double bx1, double by1, double tx1, double ty1, double bx2, double by2, double tx2, double ty2) {

		Vector3 b1(bx1, by1, 0);
		Vector3 b2(bx2, by2, 0);
		Vector3 t1(tx1, ty1, 0);
		Vector3 t2(tx2, ty2, 0);

		bool bTransf1 = false;
		bool bTransf2 = false;

		Vector3 tp1 = _p1;
		Vector3 tp2 = _p2;

		if (_p1.IsTooNear(b1))
		{
			tp1 = t1;
			if (_p2.IsTooNear(b2))
			{
				tp2 = t2;
			}
			else
			{
				tp2 = _p2 + tp1 - _p1;
			}
		}
		else if (_p2.IsTooNear(b1))
		{
			bTransf2 = true;
			tp2 = t1;
			if (_p1.IsTooNear(b2))
			{
				tp1 = t2;
			}
			else
			{
				tp1 = _p1 + tp2 - _p2;
			}
		}

		_p1 = tp1;
		_p2 = tp2;
	}
	*/


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_lineseg) {
		class_<RayCad::LineSeg, base<Geom>>("LineSeg")
			.smart_ptr_constructor("LineSeg", &std::make_shared<LineSeg>)

			.function("Set", select_overload<void(cad_type, cad_type, cad_type, cad_type, cad_type, cad_type)>(&RayCad::LineSeg::Set))
			.function("Set", select_overload<void(Vector3, Vector3)>(&RayCad::LineSeg::Set))
			.function("Get", &RayCad::LineSeg::Get)

			.function("distance2", &RayCad::LineSeg::distance2)
			.function("distance3", &RayCad::LineSeg::distance3)
			.function("distanceToRay", &RayCad::LineSeg::distanceToRay)

			.function("Clone", &RayCad::LineSeg::Clone)
			.function("GetTypeName", &RayCad::LineSeg::GetTypeName)
			.function("GeneratePreview", &RayCad::LineSeg::GeneratePreview)

			.function("GetAuxUIPoints", &RayCad::LineSeg::GetAuxUIPoints)
			.function("GetBinarySize", &RayCad::LineSeg::GetBinarySize)

			.function("IsBoxIntersect", &RayCad::LineSeg::IsBoxIntersect)

			.function("GetBoundingBox2", &RayCad::LineSeg::GetBoundingBox2)
			.function("Transform", &RayCad::LineSeg::Transform)

			.function("Offset", &RayCad::LineSeg::Offset)
			.function("Trim", select_overload<shared_ptr<Group>(shared_ptr<Geom>, bool)>(&RayCad::LineSeg::Trim))
			.function("Trim4", select_overload<shared_ptr<Group>(shared_ptr<Group>, shared_ptr<Point>)>(&RayCad::LineSeg::Trim))

			.function("Extend", &RayCad::Geom::Extend)

			.function("GetIntersection", &RayCad::LineSeg::GetIntersection)
			.function("GetIntersectionForExtend", &RayCad::LineSeg::GetIntersectionForExtend)
			
			.function("GetPortion", &RayCad::LineSeg::GetPortion)
			;
	}
#endif


}

