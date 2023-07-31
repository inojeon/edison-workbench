#include "pch.h"
using namespace std;

#include "distance.h"

using namespace RayWycobi;

namespace RayCad
{

	Spline::Spline() : PointList() {
		_type = Geom::G_SPLINE;
		_preview = NULL;
		_spline_type = 1;
		_tStart = -1;
		_tEnd = 100000000000;
	}


	string Spline::GetTypeName() {
		return "Spline";
	}


	shared_ptr<Geom> Spline::Clone()
	{
		auto pls = std::shared_ptr<Spline>(new Spline());
		pls->_id = _id;
		pls->_type = _type;
		pls->_spline_type = _spline_type;
		pls->_tStart = _tStart;
		pls->_tEnd = _tEnd;

		pls->Init(GetNumberOfPoints());

		for (int i = 0; i < this->_points.size(); ++i) {
			pls->_points[i] = this->_points[i];
		}

		return pls;
	}

	double Spline::distance2(double x, double y) {
		double dist = 0;

		if (_preview == NULL) {
			CalcPreview();
		}

		dist = _preview->distance2(x, y);
		return dist;
	}

	double Spline::distance3(double x, double y, double z) {
		double dist = 1e9;

		if (_preview == NULL) {
			CalcPreview();
		}

		dist = _preview->distance3(x, y, z);
		return dist;
	}

	double Spline::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		double dist = 1e9;

		if (_preview == NULL) {
			CalcPreview();
		}

		dist = _preview->distanceToRay(ox, oy, oz, dx, dy, dz);
		return dist;
	}

	shared_ptr<PLine> Spline::CalcPreviewTK(vector<double> *tlist)
	{
		double st = _tStart;
		double ed = _tEnd;

		int num = this->_points.size() / 3;

		if (st < 0)
			st = 0;

		if (ed> num-1) {
			ed = num - 1;
		}


		shared_ptr<PLine> elem = make_shared<PLine>();
		elem->SetID(0);

		_preview = elem;


		if (num < 3)
			return elem;

		BSpline sp;
		sp.SetType(1);
		for (int i = 0; i < num ; i++) {

			sp.AddPoint(i, _points[i*3+0], _points[i * 3 + 1], _points[i * 3 + 2] );

		}
		sp.Calc();

		double dd = 0.05;
		double j;
		for (j = st; j < ed; j += dd) {
			Vector3 cp = sp.Get(j);
			if (tlist != NULL)
				tlist->push_back(j);
			elem->AddPoint(cp._x, cp._y, cp._z);
		}

		{
			j = ed;
			Vector3 cp = sp.Get(j);
			if (tlist != NULL)
				tlist->push_back(j);
			elem->AddPoint(cp._x, cp._y, cp._z);
		}

		return elem;
	}

	shared_ptr<PLine> Spline::CalcPreview() {
		switch (_spline_type) {
		case 0:
			return CalcPreviewBS();

		case 1:
			return CalcPreviewTK();
		}

		return NULL;
	}

	shared_ptr<PLine> Spline::CalcPreviewBS() {

		shared_ptr<PLine> elem = make_shared<PLine>();
		elem->SetID(0);

		_preview = elem;

		int num = this->_points.size() / 3;

		if (num < 3)
			return elem;

		BSpline sp;
		sp.SetType(1);
		for (int i = 1; i < num+2; i++) {
			int i0;
			int i1;
			int i2;
			int i3;

			if (i == num) {
				i0 = (i - 3) * 3;
				i1 = (i - 2) * 3;
				i2 = (i - 1) * 3;
				i3 = (i - 1) * 3;
			}
			else  if (i == num+1) {
				i0 = (i - 3) * 3;
				i1 = (i - 2) * 3;
				i2 = (i - 2) * 3;
				i3 = (i - 2) * 3;
			}
			else  if (i == 1) {
				i0 = (i - 1) * 3;
				i1 = (i - 1) * 3;
				i2 = (i - 1) * 3;
				i3 = (i) * 3;
			}
			else if (i == 2) {
				i0 = (i - 2) * 3;
				i1 = (i - 2) * 3;
				i2 = (i - 1) * 3;
				i3 = (i) * 3;
			}
			else {
				i0 = (i - 3) * 3;
				i1 = (i - 2) * 3;
				i2 = (i - 1) * 3;
				i3 = (i) * 3;
			}


			Vector3 p0, p1, p2, p3;
			p0.Set(_points[i0 + 0], _points[i0 + 1], _points[i0 + 2]);
			p1.Set(_points[i1 + 0], _points[i1 + 1], _points[i1 + 2]);
			p2.Set(_points[i2 + 0], _points[i2 + 1], _points[i2 + 2]);
			p3.Set(_points[i3 + 0], _points[i3 + 1], _points[i3 + 2]);

			sp.Set(p0, p1, p2, p3);
			double dd = 0.05;
			for (double j = 0; j < 1; j += dd) {
				Vector3 cp = sp.Get(j);
				elem->AddPoint(cp._x, cp._y, cp._z);
			}
		}

		return elem;
	}




	bool Spline::GeneratePreview(shared_ptr<Group> preview) {
		shared_ptr<PLine> elem = CalcPreview();

		if (preview != NULL) {
			preview->Add(elem);
		}

		return true;
	}


	/*
	void Spline::GetAuxUIPoints(shared_ptr<PointList> plist) {
		int n = GetNumberOfPoints();

		Vector3 a = GetPoint(0);
		Vector3 b = GetPoint(n - 1);
		
		plist->AddPoint(a._x, a._y, a._z);
		plist->AddPoint(b._x, b._y, b._z);
	}
	*/

	shared_ptr<BoundingBox2> Spline::GetBoundingBox2()
	{
		shared_ptr<Group> group = make_shared<Group>();
		GeneratePreview(group);
		
		shared_ptr<BoundingBox2> boundingBox = make_shared<BoundingBox2>();
		shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(group->Get(0));
		int n = pline->GetNumberOfPoints();
		for (int i = 0; i < n; i++)
		{
			Vector3 p = pline->GetPoint(i);
			boundingBox->Add(p._x, p._y, p._z);
		}

		if (n > 0)
			boundingBox->_notDefined = false;

		return boundingBox;
	}

	void Spline::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
		shared_ptr<Group> splinePreview = make_shared<Group>();
		GeneratePreview(splinePreview);

		int n = splinePreview->GetNumberOfChildren();
		for (int i = 0; i < n; ++i) {
			shared_ptr<Geom> segment = splinePreview->Get(i);
			segment->GetIntersection(compareGeom, plist);
		}
	}

	Vector3 Spline::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
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
		wykobi::line<double, 2> line;
		wykobi::segment<double, 2> segment;
		wykobi::point2d<double> point, start_point, min_point;
		double min_dist = 1e9;

		ray.origin = { st_pt._x, st_pt._y };
		ray.direction = wykobi::make_vector(dir._x, dir._y);

		shared_ptr<Group> preview = make_shared<Group>();
		GeneratePreview(preview);
		shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(preview->Get(0));
		int n = pline->GetNumberOfPoints() - 1;
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

	shared_ptr<Group> Spline::Trim(shared_ptr<Geom> refGeom, bool bTrimFirst)
	{
		shared_ptr<Group> ret = make_shared<Group>();

		if (refGeom == nullptr)
			return ret;

		if (refGeom->GetType() != G_LINE)
			return ret;

		LineSeg* pl = (LineSeg*)refGeom.get();

		vector<double> list;
		vector<double> points;

		GetIntersectLineSeg(static_pointer_cast<LineSeg>(refGeom), list, points);
		if (list.size() > 0)
		{
			if (bTrimFirst)
			{
				double max_t = 0;
				Vector3 max_pt;
				bool bIntr = false;

				for (int i = 0; i < list.size(); i++)
				{
					Vector3 pt(points[2 * i], points[2 * i + 1], 0);
					if (max_t < list[i])
					{
						max_t = list[i];
						max_pt = pt;
						bIntr = true;
					}
				}

				shared_ptr<Geom> tSp = this->Clone();
				if (bIntr)
				{
					Spline* pSp = (Spline*)tSp.get();
					pSp->SetStartEnd(0, max_t);
				}

				ret->Add(tSp);
			}
			else
			{
				double min_t = (double)(GetNumberOfPoints() - 1);
				Vector3 min_pt;
				bool bIntr = false;

				for (int i = 0; i < list.size(); i++)
				{
					Vector3 pt(points[2 * i], points[2 * i + 1], 0);
					if (min_t > list[i])
					{
						min_t = list[i];
						min_pt = pt;
						bIntr = true;
					}
				}

				shared_ptr<Geom> tSp = this->Clone();
				if (bIntr)
				{
					Spline* pSp = (Spline*)tSp.get();
					pSp->SetStartEnd(min_t, (double)(GetNumberOfPoints() - 1));
				}

				ret->Add(tSp);
			}
		}

		return ret;
	}

	void Spline::SetStartEnd(double t1, double t2) {
		_tStart = t1;
		_tEnd = t2;
	}

	double GetLineT(double p1x, double p1y, double p2x, double p2y, double x, double y) {

		double tt = abs(p1x - p2x);
		double t = 0;
		if (tt>0.00000001) {
			// x 로 계산
			
			t = 1.0 -(p2x - x) / (p2x - p1x);
			return t;
		}
		else {
			// y 로 계산

			t = 1.0 - (p2y - y) / (p2y - p1y);
			return t;
		}

		return 0;
	}

	bool Spline::GetIntersectLineSeg(shared_ptr<LineSeg> line, vector<double> &list, vector<double> &points) {

		vector<double> tlist;
		shared_ptr<PLine> preview = CalcPreviewTK(&tlist);

		bool ret = false;

		int num = preview->GetNumberOfPoints();
		for (int i = 0; i < num-1; i++) {
			double ix, iy;

			Vector3 p1 = preview->GetPoint(i);
			Vector3 p2 = preview->GetPoint(i+1);

			if (GetIntersectionLineLine(p1._x, p1._y, p2._x, p2._y,
				line->_p1._x, line->_p1._y, line->_p2._x, line->_p2._y,
				(&ix), &iy)) {
				// intersect
				double t = tlist[i];
				double dt = tlist[i+1] - tlist[i];

				double tt = GetLineT(p1._x, p1._y, p2._x, p2._y, ix, iy);
				t += dt * tt;

				//Vector3 pp = Get(t);

				points.push_back(ix);
				points.push_back(iy);
				list.push_back(t);
				ret = true;
			}

		}
		return ret;

	}

	bool Spline::IsBoxIntersect(shared_ptr<BoundingBox2> bbox2)
	{
		shared_ptr<Group> group = make_shared<Group>();
		this->GeneratePreview(group);

		shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(group->Get(0));

		return pline->IsBoxIntersect(bbox2);
	}




#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_spline) {
		class_<Spline, base<PointList>>("Spline")
			.smart_ptr_constructor("Spline", &std::make_shared<Spline>)

			.function("Clone", &RayCad::Spline::Clone)

			.function("GeneratePreview", &RayCad::Spline::GeneratePreview)

			.function("GetTypeName", &RayCad::Spline::GetTypeName)
			//.function("GetAuxUIPoints", &RayCad::P::GetAuxUIPoints)

			.function("distance2", &RayCad::Spline::distance2)
			.function("distance3", &RayCad::Spline::distance3)
			.function("distanceToRay", &RayCad::Spline::distanceToRay)
			.function("GetBoundingBox2", &RayCad::Spline::GetBoundingBox2)
			.function("Transform", &RayCad::Spline::Transform)
			.function("GetIntersection", &RayCad::Spline::GetIntersection)
			.function("GetIntersectionForExtend", &RayCad::Spline::GetIntersectionForExtend)
			.function("SetStartEnd", &RayCad::Spline::SetStartEnd)
			.function("GetIntersectLineSeg", &RayCad::Spline::GetIntersectLineSeg)
			.function("IsBoxIntersect", &RayCad::Spline::IsBoxIntersect)
			;
	}
#endif

}