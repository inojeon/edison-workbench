#include "pch.h"

#include "distance.h"

using namespace RayWycobi;

namespace RayCad 
{


	RayCad::Polygon::Polygon()
	{
		_type = Geom::G_POLYGON;
		_bbox2 = NULL;
	}


	shared_ptr<Geom> RayCad::Polygon::Clone()
	{
		auto poly = std::shared_ptr<Polygon>(new Polygon());
		poly->_id = _id;
		poly->_type = _type;

		int num = GetNumberOfPoints();
		for (int i = 0; i < num; ++i) {
			cad_type v = _points[i];
			poly->_points.push_back(v);
		}

		return poly;
	}


	string RayCad::Polygon::GetTypeName()
	{
		return "Polygon";
	}

	double Polygon::distance2(double x, double y)
	{
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

			wykobi::segment<double, 2> segment;
			segment[0] = { fp._x, fp._y };
			segment[1] = { lp._x, lp._y };

			double tmpDist = wykobi::distance(point, segment);
			if (dist > tmpDist)
				dist = tmpDist;
		}

		// 시작점과 끝점이 연결된 선분과의 거리 비교
		fp = lp;
		lp._x = _points[0];
		lp._y = _points[1];
		lp._z = _points[2];

		wykobi::segment<double, 2> segment;
		segment[0] = { fp._x, fp._y };
		segment[1] = { lp._x, lp._y };

		double tmpDist = wykobi::distance(point, segment);
		if (dist > tmpDist)
			dist = tmpDist;
		
		return dist;
	}

	bool RayCad::Polygon::GeneratePreview(shared_ptr<Group> preview)
	{
		int n = GetNumberOfPoints();
		shared_ptr<PLine> res = make_shared<PLine>();
		res->Init(n + 1);
		res->SetID(0);

		for (int i = 0; i < n; i++) {
			Vector3 a = GetPoint(i);
			res->SetPoint(i, a._x, a._y, a._z);
		}

		Vector3 a = GetPoint(0);
		res->SetPoint(n, a._x, a._y, a._z);

		int ret = preview->Add(res);
		
		if (ret < 0)
			return false;
		return true;
	}


	

	void Polygon::GetAuxUIPoints(shared_ptr<PointList> plist) {
		int n = GetNumberOfPoints();
		for (int i = 0; i < n; i++) {
			auto a = this->GetPoint(i);
			if (i != n - 1) {
				auto p2 = this->GetPoint(i + 1);
				plist->AddPoint((a._x + p2._x) / 2, (a._y + p2._y) / 2, (a._z + p2._z) / 2);
			}
			else {
				auto p2 = this->GetPoint(0);
				plist->AddPoint((a._x + p2._x) / 2, (a._y + p2._y) / 2, (a._z + p2._z) / 2);
			}

			plist->AddPoint(a._x, a._y, a._z);
		}
	}


	shared_ptr<BoundingBox2> Polygon::GetBoundingBox2()
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


	shared_ptr<Group> Polygon::Explode()
	{
		shared_ptr<Group> ret = make_shared<Group>();
		int n = GetNumberOfPoints();
		Vector3 fp, lp;

		for (int i = 0; i < n; i++) {
			fp = GetPoint(i);
			if (i != n - 1)
				lp = GetPoint(i + 1);
			else
				lp = GetPoint(0);
			

			shared_ptr<LineSeg> line = make_shared<LineSeg>();
			line->Set(fp._x, fp._y, 0, lp._x, lp._y, 0);
			ret->Add(line);
		}

		return ret;
	}

	Vector3 Polygon::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
	{
		double min_dist = 1e9;
		Vector3 min_point = st_pt;

		int n = this->GetNumberOfPoints() - 1;
		for (int i = 0; i < n; ++i)
		{
			double dist = GetRayToLineSegmentIntersection(st_pt, dir, GetPoint(i), GetPoint(i + 1));
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

		int n = this->GetNumberOfPoints();
		for (int i = 0; i < n; ++i)
		{
			segment[0] = { GetPoint(i)._x, GetPoint(i)._y };
			segment[1] = { GetPoint(i + 1)._x, GetPoint(i + 1)._y };
			
			if (i == n - 1)
				segment[1] = { GetPoint(0)._x, GetPoint(0)._y };

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

	int Polygon::GetBinarySize(bool bIncludeTag)
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


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_polygon) {
		class_<Polygon, base<PointList>>("Polygon")
			.smart_ptr_constructor("Polygon", &std::make_shared<Polygon>)

			.function("Clone", &RayCad::Polygon::Clone)
			.function("GetTypeName", &RayCad::Polygon::GetTypeName)
			
			.function("GeneratePreview", &RayCad::Polygon::GeneratePreview)
			.function("GetAuxUIPoints", &RayCad::Polygon::GetAuxUIPoints)

			.function("distance2", &RayCad::Polygon::distance2)
			.function("GetBoundingBox2", &RayCad::Polygon::GetBoundingBox2)

			.function("Explode", &RayCad::Polygon::Explode)
			.function("Transform", &RayCad::Polygon::Transform)
			.function("GetIntersectionForExtend", &RayCad::Polygon::GetIntersectionForExtend)
			;
	}
#endif
}