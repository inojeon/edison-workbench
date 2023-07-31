#include "pch.h"
using namespace std;

#include "distance.h"

using namespace RayWycobi;

namespace RayCad
{

	PLine::PLine() : PointList() {
		_type = Geom::G_PLINE;
		_bbox2 = NULL;
	}


	void PLine::GeneratePolygon(double centerx, double centery, double centerz, double spx, double spy, double spz, int number, double nx, double ny, double nz) {
		Init(number + 1);

		Vector3 center(centerx, centery, centerz);
		Vector3 ux(spx - centerx, spy - centery, spz - centerz);
		Vector3 nv(nx, ny, nz);
		double radius = ux.Length();
		ux.Normalize();
		Vector3 uy = nv.Cross(ux);
		uy.Normalize();

		double drad = 2.0 * M_PI / number;
		double crad = 0;
		for (int i = 0; i <= number; i++) {
			double px = cos(crad) * radius;
			double py = sin(crad) * radius;

			Vector3 cx(ux);
			cx.MultiplyScalar(px);
			Vector3 cy(uy);
			cy.MultiplyScalar(py);
			
			Vector3 pp = center + cx + cy;
			SetPoint(i, pp._x, pp._y, pp._z);

			crad += drad;
		}

		//SetPoint(number, spx, spy, 0);
	}

	void PLine::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
		shared_ptr<Group> comparePreview = make_shared<Group>();
		compareGeom->GeneratePreview(comparePreview);
		
		auto p1 = this->GetPoint(0);
		auto p2 = this->GetPoint(1);

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
		return ;
	}

	Vector3 PLine::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
	{
		double min_dist = 1e9;
		Vector3 min_point = st_pt;

		int n = this->GetNumberOfPoints() - 1;
		for (int i = 0; i < n; ++i)
		{
			double dist = GetRayToLineSegmentIntersection(st_pt, dir, GetPoint(i), GetPoint(i+1));
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
		wykobi::line<double, 2> line;
		wykobi::segment<double, 2> segment;
		wykobi::point2d<double> point, start_point, min_point;
		double min_dist = 1e9;

		ray.origin = { st_pt._x, st_pt._y };
		ray.direction = wykobi::make_vector(dir._x, dir._y);

		int n = this->GetNumberOfPoints() - 1;
		for (int i = 0; i < n; ++i) 
		{
			segment[0] = { GetPoint(i)._x, GetPoint(i)._y };
			segment[1] = { GetPoint(i + 1)._x, GetPoint(i + 1)._y };

			//if (wykobi::intersect(ray, segment)) 
			{
				point = wykobi::intersection_point(segment, line);
				if (distance(point, ray.origin) < min_dist) 
				{
					min_dist = distance(point, ray.origin);
					min_point = point;
				}
			}
		}
		return Vector3(min_point.x, min_point.y, 0);
		*/
	}



	string PLine::GetTypeName() {
		return "PLine";
	}

	double PLine::distance2(double x, double y) {
		
		int n = this->GetNumberOfPoints() - 1;
		double dist = 1e9;
		wykobi::point2d<double> point;
		point.x = x;
		point.y = y;

		Vector3 fp, lp;
		
		for (int i = 0; i < n; i++)
		{
			if (i == 0) {
				fp._x = _points[0];
				fp._y = _points[1];
				fp._z = _points[2];
			} 
			else {
				fp = lp;
			}

			lp._x = _points[i * 3 + 3];
			lp._y = _points[i * 3 + 4];
			lp._z = _points[i * 3 + 5];

			wykobi::segment<double,2> segment;
			segment[0] = { fp._x, fp._y };
			segment[1] = { lp._x, lp._y };

			double tmpDist = wykobi::distance(point, segment);
			if (dist > tmpDist)
				dist = tmpDist;
		}

		return dist;
	}

	double PLine::distance3(double x, double y, double z) {

		int n = this->GetNumberOfPoints() - 1;
		double dist = 1e9;
		wykobi::point3d<double> point;
		point.x = x;
		point.y = y;
		point.z = z;

		Vector3 fp, lp;

		for (int i = 0; i < n; i++)
		{
			if (i == 0) {
				fp._x = _points[0];
				fp._y = _points[1];
				fp._z = _points[2];
			}
			else {
				fp = lp;
			}

			lp._x = _points[i * 3 + 3];
			lp._y = _points[i * 3 + 4];
			lp._z = _points[i * 3 + 5];

			wykobi::segment<double, 3> segment;
			segment[0] = { fp._x, fp._y, fp._z };
			segment[1] = { lp._x, lp._y, lp._z };

			double tmpDist = wykobi::distance(point, segment);
			if (dist > tmpDist)
				dist = tmpDist;
		}

		return dist;
	}

	double PLine::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {

		int n = this->GetNumberOfPoints() - 1;
		double dist = 1e9;
		Vector3 ro(ox, oy, oz);
		Vector3 rd(dx, dy, dz);

		Vector3 fp, lp;

		for (int i = 0; i < n; i++)
		{
			if (i == 0) {
				fp._x = _points[0];
				fp._y = _points[1];
				fp._z = _points[2];
			}
			else {
				fp = lp;
			}

			lp._x = _points[i * 3 + 3];
			lp._y = _points[i * 3 + 4];
			lp._z = _points[i * 3 + 5];

			double tmpDist = DistRaySegment3(ro, rd, fp, lp);
			if (dist > tmpDist)
				dist = tmpDist;
		}

		return dist;
	}

	bool PLine::GeneratePreview(shared_ptr<Group> preview) {
		
		shared_ptr<Geom> elem = this->Clone();
		elem->SetID(0);
		int ret = preview->Add(elem);

		if (ret < 0)
			return false;
		return true;
	}



	shared_ptr<Geom> PLine::Clone()
	{
		auto pls = std::shared_ptr<PLine>(new PLine());
		pls->_id = _id;
		pls->_type = _type;
		
		pls->Init(GetNumberOfPoints());

		for (int i = 0; i < this->_points.size(); ++i) {
			pls->_points[i] = this->_points[i];
		}

		return pls;
	}



	void PLine::GetAuxUIPoints(shared_ptr<PointList> plist)
	{
		PLine* pLine = (PLine*)this;
		int n = pLine->GetNumberOfPoints();
		for (int i = 0; i < n; i++)
		{
			auto p = pLine->GetPoint(i);
			if (i != n - 1) {
				auto p2 = pLine->GetPoint(i + 1);
				plist->AddPoint((p._x + p2._x) / 2, (p._y + p2._y) / 2, (p._z + p2._z) / 2);
			}
			plist->AddPoint(p._x, p._y, p._z);
		}
	}

	shared_ptr<BoundingBox2> PLine::GetBoundingBox2()
	{
		shared_ptr<BoundingBox2> boundingBox2 = make_shared<BoundingBox2>();
		int n = GetNumberOfPoints();
		for (int i = 0; i < n; i++)
		{
			Vector3 p = GetPoint(i);
			boundingBox2->Add(p._x, p._y, p._z);
		}

		if(n > 0)
			boundingBox2->_notDefined = false;

		return boundingBox2;
	}

	bool PLine::IsBoxIntersect(shared_ptr<BoundingBox2> bbox2)
	{
		double	coordX[2] = { bbox2->_minCoord._x, bbox2->_maxCoord._x },
				coordY[2] = { bbox2->_minCoord._y, bbox2->_maxCoord._y };

		// 포함 관계 확인
		if (IsBoxContain(bbox2))
			return true;

		// 교차 확인
		wykobi::segment<double, 2> segment[4], lineSeg;
		shared_ptr<PLine> pline = make_shared<PLine>();
		pline->AddPoint(coordX[0], coordY[0], 0);
		pline->AddPoint(coordX[0], coordY[1], 0);
		pline->AddPoint(coordX[1], coordY[1], 0);
		pline->AddPoint(coordX[1], coordY[0], 0);

		int len = GetNumberOfPoints()-1;
		for (int k = 0; k < len; k++) {
			
			lineSeg[0].x = GetPoint(k)._x;
			lineSeg[0].y = GetPoint(k)._y;
			lineSeg[1].x = GetPoint(k + 1)._x;
			lineSeg[1].y = GetPoint(k + 1)._y;
			

			for (int i = 0; i < 4; i++) {
				for (int j = 0; j < 4; j++) {
					Vector3 p1 = pline->GetPoint(j % 4), p2 = pline->GetPoint((j + 1) % 4);
					segment[i][0].x = p1._x;
					segment[i][0].y = p1._y;
					segment[i][1].x = p2._x;
					segment[i][1].y = p2._y;

					if (wykobi::intersect(segment[i], lineSeg)) {
						return true;
					}
				}
			}
		}

		return false;
	}

	shared_ptr<Group> PLine::Explode()
	{
		shared_ptr<Group> ret = make_shared<Group>();
		int n = GetNumberOfPoints();
		Vector3 fp, lp;

		for (int i = 0; i < n-1; i++) {
			fp = GetPoint(i);
			lp = GetPoint(i + 1);

			shared_ptr<LineSeg> line = make_shared<LineSeg>();
			line->Set(fp._x, fp._y, 0, lp._x, lp._y, 0);
			ret->Add(line);
		}

		return ret;
	}

	/// Trim 변환을 수행한다.
	/// </summary>
	/// <param name="refGeom">trim 할 참조 geom</param>
	/// <param name="bTrimFirst">Trim 할 객체 부분을 선택</param>
	/// <returns>Trimmed Object</returns>
	shared_ptr<Group> PLine::Trim(shared_ptr<Geom> refGeom, bool bTrimFirst)
	{
		shared_ptr<Group> ret = make_shared<Group>();

		if (refGeom == nullptr)
			return ret;

		if (refGeom->GetType() != G_LINE)
			return ret;

		LineSeg* pl = (LineSeg*)refGeom.get();

		vector<int> ip_idxs;
		vector<Vector3> ips;
		double ix, iy;
		for (int i = 0; i < (GetNumberOfPoints() - 1); i++)
		{
			Vector3 lp1 = GetPoint(i);
			Vector3 lp2 = GetPoint(i+1);
			if (GetIntersectionLineLine(lp1._x, lp1._y, lp2._x, lp2._y, pl->_p1._x, pl->_p1._y, pl->_p2._x, pl->_p2._y, &ix, &iy))
			{
				Vector3 ip(ix, iy, 0);
				
				// if intersection point is previous duplicated, skip.
				if (ips.size() > 0 && ip.IsTooNear(ips[ips.size()-1]))
					continue;

				Vector3 lv(pl->_p2._x - pl->_p1._x, pl->_p2._y - pl->_p1._y, 0);

				// if intersection point is on previous corner and line not crossing, skip.
				if (i > 0 && ip.IsTooNear(lp1))
				{
					Vector3 lp0 = GetPoint(i - 1);
					Vector3 pv = lp0 - lp1;
					Vector3 nv = lp2 - lp1;
					Vector3 c_pv = lv.Cross(pv);
					Vector3 c_nv = lv.Cross(nv);
					double det_cross = c_pv._z * c_nv._z;
					if (det_cross >= 0)
						continue;
				}

				// if intersection point is on next corner and line not crossing, skip.
				if (i < (GetNumberOfPoints() - 1) && ip.IsTooNear(lp2))
				{
					Vector3 lp3 = GetPoint(i + 1);
					Vector3 pv = lp1 - lp2;
					Vector3 nv = lp3 - lp2;
					Vector3 c_pv = lv.Cross(pv);
					Vector3 c_nv = lv.Cross(nv);
					double det_cross = c_pv._z * c_nv._z;
					if (det_cross >= 0)
						continue;
				}

				// add new intersect point for trimming.
				ip_idxs.push_back(i);
				ips.push_back(ip);
			}
		}

		if (ips.size() > 0)
		{
			bool add_subtrim = !bTrimFirst;

			shared_ptr<PLine> spl = make_shared<PLine>();
			spl->Init(0);

			int cur_idx = -1;

			for (int i = 0; i < ips.size(); i++)
			{
				if (cur_idx < ip_idxs[i])
				{
					do
					{
						cur_idx++;
						Vector3 cp = GetPoint(cur_idx);
						spl->AddPoint(cp._x, cp._y, 0);
					} while (cur_idx < ip_idxs[i]);

					if (!ips[i].IsTooNear(GetPoint(cur_idx)))
					{
						spl->AddPoint(ips[i]._x, ips[i]._y, 0);
					}

					if (add_subtrim)
					{
						if (spl->GetNumberOfPoints() == 2)
						{
							shared_ptr<LineSeg> sl = make_shared<LineSeg>();
							Vector3 p1 = spl->GetPoint(0);
							Vector3 p2 = spl->GetPoint(1);
							sl->Set(p1._x, p1._y, 0, p2._x, p2._y, 0);
							ret->Add(sl);
						}
						else
						{
							ret->Add(spl);
						}
					}

					add_subtrim = !add_subtrim;

					spl = make_shared<PLine>();
					spl->Init(0);
					spl->AddPoint(ips[i]._x, ips[i]._y, 0);
				}
			}

			if (add_subtrim)
			{
				if (cur_idx < (GetNumberOfPoints()-1))
				{
					do
					{
						cur_idx++;
						Vector3 cp = GetPoint(cur_idx);
						spl->AddPoint(cp._x, cp._y, 0);
					} while (cur_idx < (GetNumberOfPoints()-1));

					if (spl->GetNumberOfPoints() == 2)
					{
						shared_ptr<LineSeg> sl = make_shared<LineSeg>();
						Vector3 p1 = spl->GetPoint(0);
						Vector3 p2 = spl->GetPoint(1);
						sl->Set(p1._x, p1._y, 0, p2._x, p2._y, 0);
						ret->Add(sl);
					}
					else
					{
						ret->Add(spl);
					}
				}
			}

		}
		else
		{
			ret->Add(this->Clone());
		}

		return ret;
	}

	shared_ptr<Group> PLine::Trim(shared_ptr<Group> target, shared_ptr<Point> origin)
	{	
		/*
		
		추가 구현이 필요하다면 주석보고 만들기
		// origin에서 dist가 0인 segment를 찾는다.
		 
		// 찾은 segment에서 LineSeg의 Trim을 진행한다.

		// 결과로 길이 2짜리가 나온 경우

		// 결과물 + 찾은 segment idx보다 작은 녀석들 + 찾은 segment idx보다 큰 녀석들을 그룹으로 반환

		// 결과물이 0 또는 1이라면

		// 0인 경우, 좌측에 저장해두었던 plist 중 segment idx가 가장 큰 지점을 찾는다. (l_pt)
		// 우측에 저장해두었던 plist 중 segment idx가 가장 작은 지점을 찾는다. (r_pt)
		// st_pt ~ l_pt + r_pt ~ ed_pt를 그룹으로 반환한다.

		// 1인 경우, origin과 point의 portion을 GetPortion()을 통해 계산한다.
		// origin > portion => 좌측 segment들만 남겨놓기 + 우측에 삭제될 segment 고려
		// st_pt ~ plist 중 origin과 인덱스가 같은 plist 중 가장 먼저 오는 곳까지
		// 우측에서 가장 먼저 만나는 plist의 인덱스 찾기 & 여기서부터 끝까지
		
		// origin < portion => 우측 segment들만 남겨놓기
		// st_pt ~ origin보다 인덱스가 작은 plist 중 가장 큰 인덱스의 plist + 우측 세그먼트들 추가
		shared_ptr<BoundingBox2> bbox2 = this->GetBoundingBox2();
		shared_ptr<PointList> plist;
		shared_ptr<Group> result = make_shared<Group>();
		shared_ptr<LineSeg> segment;
		shared_ptr<Group> trimmedGroup;
		shared_ptr<Group> explodedGroup;
		vector<pair<int, int>> crossInfo;	// i: i번째 pline segment. j: j번째 교점
		for (int i = 0; i < target->GetNumberOfChildren(); ++i) {

			if (target->Get(i)->GetBoundingBox2()->IsIntersect(bbox2)) {
				plist = make_shared<PointList>();
				GetIntersection(target->Get(i), plist);
				if (plist->GetNumberOfPoints() > 0) {
					for (int j = 0; j < plist->GetNumberOfPoints(); ++j) {
						crossInfo.push_back({ i, j });
					}
				}
			}
		}

		explodedGroup = this->Explode();
		for (int i = 0; i < explodedGroup->GetNumberOfChildren(); ++i) {
			if (explodedGroup->Get(i)->distance3(origin->_x, origin->_y, origin->_z) == 0) {
				segment = explodedGroup->Get(i);

				trimmedGroup = segment->Trim()
			}
		}




		double minDist = 9999999, dist;
		int selectedIdx = -1;
		auto lineSegments = this->Explode();
		bool left = true;
		int plistIdx1, plistIdx2, segmentIdx1, segmentIdx2;
		for (int i = 0; i < lineSegments->GetNumberOfChildren(); ++i) {
			dist = lineSegments->Get(i)->distance3(origin->_x, origin->_y, origin->_z);
			
			// 선택된 세그먼트를 찾았다면
			if (dist == 0) {
				
			}
		}

		// 좌측 segment들에 대한 교점을 찾아보자
		for (int i = selectedIdx; i >= 0; --i) {
			
		}

		// 우측 segment들에 대한 교점을 찾아보자
		for (int i = selectedIdx; i < lineSegments->GetNumberOfChildren(); ++i) {
		}

		if (leftIdx != this->GetNumberOfPoints()) {
			for (int i = 0; i <= leftIdx; ++i) {
				result->Add(lineSegments->Get(i));
			}
		}

		if (rightIdx != -1) {
			for (int i = rightIdx; i < lineSegments->GetNumberOfChildren(); ++i) {
				result->Add(lineSegments->Get(i));
			}
		}
		*/
		//return result;
		return nullptr;
	}

	void PLine::Extend(shared_ptr<Geom> refGeom)
	{
		if (refGeom == nullptr)
			return;

		int n = GetNumberOfPoints();

		Vector3 p1 = GetPoint(0);
		Vector3 p2 = GetPoint(n - 1);

		Vector3 p1s = GetPoint(1);
		Vector3 p2s = GetPoint(n - 2);

		Vector3 d1 = p1 - p1s;
		d1.Normalize();
		Vector3 d2 = p2 - p2s;
		d2.Normalize();

		Vector3 _e1 = refGeom->GetIntersectionForExtend(p1, d1);
		Vector3 _e2 = refGeom->GetIntersectionForExtend(p2, d2);

		bool bHasExt1 = !_e1.IsTooNear(p1);
		bool bHasExt2 = !_e2.IsTooNear(p2);

		if (bHasExt1 && bHasExt2)
		{
			double dist_e1 = (_e1 - p1).Length();
			double dist_e2 = (_e2 - p2).Length();
			if (dist_e1 < dist_e2)
			{
				SetPoint(0, _e1._x, _e1._y, 0);
			}
			else
			{
				SetPoint(n-1, _e2._x, _e2._y, 0);
			}
		}
		else if (bHasExt1)
		{
			SetPoint(0, _e1._x, _e1._y, 0);
		}
		else if (bHasExt2)
		{
			SetPoint(n - 1, _e2._x, _e2._y, 0);
		}
	}



#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_pline) {
		class_<PLine, base<PointList>>("PLine")
			.smart_ptr_constructor("PLine", &std::make_shared<PLine>)

			.function("Clone", &RayCad::PLine::Clone)
			.function("GetTypeName", &RayCad::PLine::GetTypeName)

			.function("GeneratePreview", &RayCad::PLine::GeneratePreview)
			.function("GetAuxUIPoints", &RayCad::PLine::GetAuxUIPoints)
			
			.function("IsBoxIntersect", &RayCad::PLine::IsBoxIntersect)

			.function("distance2", &RayCad::PLine::distance2)
			.function("distance3", &RayCad::PLine::distance3)
			.function("distanceToRay", &RayCad::PLine::distanceToRay)
			.function("GetBoundingBox2", &RayCad::PLine::GetBoundingBox2)

			.function("Explode", &RayCad::PLine::Explode)
			.function("Trim", select_overload<shared_ptr<Group>(shared_ptr<Geom>, bool)>(&RayCad::PLine::Trim))
			.function("Trim4", select_overload<shared_ptr<Group>(shared_ptr<Group>, shared_ptr<Point>)>(&RayCad::PLine::Trim))
			
			.function("GeneratePolygon", &RayCad::PLine::GeneratePolygon)
			.function("GetIntersection", &RayCad::PLine::GetIntersection)
			.function("GetIntersectionForExtend", &RayCad::PLine::GetIntersectionForExtend)
			;
	}
#endif

}