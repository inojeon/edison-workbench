#include "pch.h"


namespace RayCad {


	shared_ptr<Point> IntersectRayPlane(cad_type planex, cad_type planey, cad_type planez,
		cad_type planenx, cad_type planeny, cad_type planenz,
		cad_type rayx, cad_type rayy, cad_type rayz,
		cad_type raynx, cad_type rayny, cad_type raynz
	) {

		wykobi::plane<cad_type, 3> plane = wykobi::make_plane<cad_type>(planex, planey, planez, planenx, planeny, planenz);
		wykobi::ray<cad_type, 3> ray = wykobi::make_ray<cad_type>(rayx, rayy, rayz, raynx, rayny, raynz);

		if (wykobi::intersect(ray, plane))
		{
			wykobi::point3d<cad_type> point = wykobi::intersection_point<cad_type>(ray, plane);
			auto pt = std::shared_ptr<Point>(new Point());
			pt->Set(point.x, point.y, point.z);
			return pt;
		}
		else
		{
			return NULL;
		}
	}

	bool GetIntersectionLineLine(double l1x, double l1y, double l1x2, double l1y2,
		double l2x, double l2y, double l2x2, double l2y2, double* rx, double* ry) {

		wykobi::segment<double, 2> iGeomSegment, jGeomSegment;
		iGeomSegment[0] = { l1x, l1y };
		iGeomSegment[1] = { l1x2, l1y2 };
		jGeomSegment[0] = { l2x, l2y };
		jGeomSegment[1] = { l2x2, l2y2 };

		if (wykobi::intersect(iGeomSegment, jGeomSegment)) {
			wykobi::point2d<double> point = wykobi::intersection_point(iGeomSegment, jGeomSegment);
			*rx = point[0];
			*ry = point[1];
			return true;
		}

		return false;
	}

	bool IsIntersectLinePoint(double l1x, double l1y, double l1x2, double l1y2, double p1x, double p1y)
	{
		double r1 = (l1x - p1x) / (l1y - p1y);
		double r2 = (p1x - l1x2) / (p1y - l1y2);

		if (abs(r1-r2) < 0.001)
			return true;

		return false;
	}

	void CalculatePreviewIntersection(shared_ptr<Group> src, shared_ptr<Group> comp, shared_ptr<PointList> plist)
	{
		if (!(src->_bbox2->IsIntersect(comp->_bbox2))) {
			return;
		}
		shared_ptr<Group> srcGroup, compGroup;
		// preview가 line인 경우에 한 해 편의를 위해 pline으로 변경한다.
		if (src->Get(0)->GetType() == Geom::G_LINE) {
			shared_ptr<LineSeg> line = dynamic_pointer_cast<LineSeg>(src->Get(0));
			shared_ptr<PLine> pline = make_shared<PLine>();
			pline->AddPoint(line->Get(0)._x, line->Get(0)._y, line->Get(0)._z);
			pline->AddPoint(line->Get(1)._x, line->Get(1)._y, line->Get(1)._z);
			srcGroup = make_shared<Group>();
			srcGroup->Add(pline);
		}
		else {
			srcGroup = src;
		}
		if (comp->Get(0)->GetType() == Geom::G_LINE) {
			shared_ptr<LineSeg> line = dynamic_pointer_cast<LineSeg>(comp->Get(0));
			shared_ptr<PLine> pline = make_shared<PLine>();
			pline->AddPoint(line->Get(0)._x, line->Get(0)._y, line->Get(0)._z);
			pline->AddPoint(line->Get(1)._x, line->Get(1)._y, line->Get(1)._z);
			compGroup = make_shared<Group>();
			compGroup->Add(pline);

		}
		else {
			compGroup = comp;
		}

		shared_ptr<PLine> srcPLine;
		shared_ptr<PLine> compPLine;

		if (!((srcGroup->GetNumberOfChildren() == 1) && (compGroup->GetNumberOfChildren() == 1))) {
			cout << "void CalculatePreviewIntersection(shared_ptr<Group> src, shared_ptr<Group> comp, shared_ptr<PointList> plist) 를 구하는 과정 속에서 srcGroup 혹은 compGroup의 Chlid 수가 1을 넘어섭니다!" << endl;
			return;
		}

		srcPLine = dynamic_pointer_cast<PLine>(srcGroup->Get(0));
		compPLine = dynamic_pointer_cast<PLine>(compGroup->Get(0));

		int n = srcPLine->GetNumberOfPoints() - 1;
		int m = compPLine->GetNumberOfPoints() - 1;
		Vector3 srcStPt, srcEdPt, compStPt, compEdPt, interPt;
		for (int i = 0; i < n; ++i) 
		{
			srcStPt.Set(srcPLine->GetPoint(i)._x, srcPLine->GetPoint(i)._y, srcPLine->GetPoint(i)._z);
			srcEdPt.Set(srcPLine->GetPoint(i+1)._x, srcPLine->GetPoint(i+1)._y, srcPLine->GetPoint(i+1)._z);
			
			for (int j = 0; j < m; ++j) 
			{
				compStPt.Set(compPLine->GetPoint(j)._x, compPLine->GetPoint(j)._y, compPLine->GetPoint(j)._z);
				compEdPt.Set(compPLine->GetPoint(j + 1)._x, compPLine->GetPoint(j + 1)._y, compPLine->GetPoint(j + 1)._z);
				
				// 좌표 세팅은 끝났으니 교점을 가져온다.
				if (j == 15)
					j = 15;
				interPt = GetIntersectionPoint(srcStPt, srcEdPt, compStPt, compEdPt);
				if (interPt._x > -1e9 || interPt._y > -1e9 || interPt._z > -1e9) {
					plist->AddPoint(interPt._x, interPt._y, interPt._z);
				}
			}
		}
	}
	Vector3 GetIntersectionPoint(Vector3 srcStartPoint, Vector3 srcEndPoint, Vector3 compStartPoint, Vector3 compEndPoint)
	{
		Vector3 intersectPoint = Vector3(-1e9-1, -1e9 - 1, -1e9 - 1);
		int minAxis = -1;
		double alpha, beta;

		Vector3 srcOrigin, srcDir, compOrigin, compDir;
		srcOrigin = srcStartPoint;
		compOrigin = compStartPoint;
		srcDir = srcEndPoint.operator-(srcStartPoint);
		compDir = compEndPoint.operator-(compStartPoint);

		double x, y, z, min_val = 1e9;
		x = abs(srcDir._x) + abs(compDir._x);
		y = abs(srcDir._y) + abs(compDir._y);
		z = abs(srcDir._z) + abs(compDir._z);
		
		if (min_val > x)
			min_val=x;
		if (min_val > y)
			min_val = y;
		if (min_val > z)
			min_val = z;

		if (y == min_val) {
			minAxis = 1;
		}
		else if (x == min_val) {
			minAxis = 0;
		}
		else if (z == min_val) {
			minAxis = 2;
		}
		/*
		if (abs(srcDir._x) < abs(srcDir._z)) {
			if (abs(srcDir._x) < abs(srcDir._y))
				minAxis = 0;

			else if (abs(srcDir._y) < abs(srcDir._z)) {
				if (abs(srcDir._x) < abs(srcDir._y))
					minAxis = 0;
				else
					minAxis = 1;
			}
		}
		else {
			if (abs(srcDir._y) < abs(srcDir._z))
				minAxis = 1;
			else
				minAxis = 2;
		}
		*/

		// yz
		if (minAxis == 0) {
			alpha = ((compOrigin._y - srcOrigin._y) * compDir._z + (srcOrigin._z - compOrigin._z) * compDir._y) / (compDir._z * srcDir._y - compDir._y * srcDir._z);
			beta = ((compOrigin._y - srcOrigin._y) * srcDir._z + (srcOrigin._z - compOrigin._z) * srcDir._y) / (compDir._z * srcDir._y - compDir._y * srcDir._z);
		}
		// zx
		else if (minAxis == 1) {
			alpha = ((compOrigin._z - srcOrigin._z) * compDir._x + (srcOrigin._x - compOrigin._x) * compDir._z) / (compDir._x * srcDir._z - compDir._z * srcDir._x);
			beta = ((compOrigin._z - srcOrigin._z) * srcDir._x + (srcOrigin._x - compOrigin._x) * srcDir._z) / (compDir._x * srcDir._z - compDir._z * srcDir._x);
		}
		// xy
		else if (minAxis == 2) {
			alpha = ((compOrigin._x - srcOrigin._x) * compDir._y + (srcOrigin._y - compOrigin._y) * compDir._x) / (compDir._y * srcDir._x - compDir._x * srcDir._y);
			beta = ((compOrigin._x - srcOrigin._x) * srcDir._y + (srcOrigin._y - compOrigin._y) * srcDir._x) / (compDir._y * srcDir._x - compDir._x * srcDir._y);
		}
		else {
			return intersectPoint;
		}

		if ((0.0 <= alpha && alpha <= 1.0) && (0.0 <= beta && beta <= 1.0)) {
		
			srcDir.MultiplyScalar(alpha);
			return srcOrigin.operator+(srcDir);
		}
			
		return intersectPoint;
	}
	void GetIntersectionPointList(shared_ptr<Group> group, shared_ptr<PointList> plist, shared_ptr<Geom> refObj)
	{
		/* 
		현재 캔버스에 있는 도형의 집합(group)에서 preview를 구한 뒤,
		pline 혹은 lineseg로부터 교점을 구한다.
		*/
		int n, m;
		n = group->GetNumberOfChildren()-1;
		vector<shared_ptr<Group>> previewList;
		
		// 도형 하나하나 마다 preview를 생성한다.
		for (int i = 0; i <= n; ++i) {
			shared_ptr<Group> preview = make_shared<Group>();
			shared_ptr<BoundingBox2> box;

			group->Get(i)->GeneratePreview(preview);
			box = group->Get(i)->GetBoundingBox2();
			previewList.push_back(preview);
			preview->_bbox2 = box;
		}

		if (refObj != NULL) {
			shared_ptr<Group> refPreview = make_shared<Group>();
			shared_ptr<BoundingBox2> box;

			refObj->GeneratePreview(refPreview);
			box = refObj->GetBoundingBox2();
			refPreview->_bbox2 = box;
			for (int i = 0; i <= n; ++i) {
				if (group->Get(i) == refObj)
					continue;
				CalculatePreviewIntersection(refPreview, previewList.at(i), plist);
			}
		}
		else {
			// 각각의 도형에 대해 교차점 조사를 진행한다.
			for (int i = 0; i < n; ++i) {
				for (int j = i + 1; j <= n; ++j) {
					CalculatePreviewIntersection(previewList.at(i), previewList.at(j), plist);
				}
			}
		}
		

		return;
		set<wykobi::point2d<double>> intersectSet;
		wykobi::point2d<double> point, point1, point2;

		int iType, jType;
		shared_ptr<wykobi::segment<double, 2>> iGeomSegment, jGeomSegment;
		shared_ptr<wykobi::circle<double>> iGeomCircle, jGeomCircle;
		shared_ptr<wykobi::polygon<double, 2>> iGeomPoly, jGeomPoly;
		shared_ptr<BoundingBox2> iBbox2, jBbox2;

		shared_ptr<vector<GeomEntity>> geomEntityList = make_shared<vector<GeomEntity>>();

		GetGeomEntity(group, geomEntityList);

		int N = geomEntityList->size();
		int refIdx = -1;
		if (refObj != NULL) {
			for (int i = 0; i < N; ++i) {
				if (group->Get(i) == refObj) {
					refIdx = i;
					break;
				}
			}
		}

		for (int I = 0; I < N; ++I)
		{


			
			switch (geomEntityList->at(I).type)
			{
			case Geom::G_SPLINE:
			case Geom::G_PLINE:
			case Geom::G_POLYGON:
			{
				iGeomPoly = geomEntityList->at(I).polygon;
				int n = iGeomPoly.get()->size() - 1;

				if (geomEntityList->at(I).type == Geom::G_POLYGON)
					n += 1;

				for (int i = 0; i < n; ++i) {
					wykobi::segment<double, 2> tempGeomSegment1, tempGeomSegment2;
					tempGeomSegment1[0] = iGeomPoly->operator[](i);
					tempGeomSegment1[1] = iGeomPoly->operator[](i + 1);

					for (int j = i + 2; j < n; ++j) {

						tempGeomSegment2[0] = iGeomPoly->operator[](j);
						tempGeomSegment2[1] = iGeomPoly->operator[](j + 1);

						if (wykobi::intersect(tempGeomSegment1, tempGeomSegment2)) {
							point = wykobi::intersection_point(tempGeomSegment1, tempGeomSegment2);
							intersectSet.insert(point);
						}
					}
				}
			}
			break;
			}
		}

		for (int I = 0; I < N - 1; ++I)
		{

			iBbox2 = geomEntityList->at(I).bbox2;
			iType = geomEntityList->at(I).type;

			switch (iType)
			{

			case Geom::G_CIRCLE:
			{
				iGeomCircle = geomEntityList->at(I).circle;
			}
			break;

			case Geom::G_LINE:
			{
				iGeomSegment = geomEntityList->at(I).segment;
			}
			break;

			case Geom::G_SPLINE:
			case Geom::G_POLYGON:
			case Geom::G_PLINE:
			case Geom::G_ARC2:
			{
				iGeomPoly = geomEntityList->at(I).polygon;
			}
			break;

			}


			for (int J = I + 1; J < N; ++J)
			{
				// ref object와는 관계없는 교점일 시엔 건너뛴다.
				if (refObj != NULL && refIdx != -1)
					if (I != refIdx && J != refIdx)
						continue;

				jBbox2 = geomEntityList->at(J).bbox2;
				jType = geomEntityList->at(J).type;

				if (!(iBbox2->IsIntersect(jBbox2)))
					continue;

				switch (jType)
				{

				case Geom::G_CIRCLE:
				{
					jGeomCircle = geomEntityList->at(J).circle;
				}
				break;

				case Geom::G_LINE:
				{
					jGeomSegment = geomEntityList->at(J).segment;
				}
				break;

				case Geom::G_SPLINE:
				case Geom::G_POLYGON:
				case Geom::G_PLINE:
				case Geom::G_ARC2:
				{
					jGeomPoly = geomEntityList->at(J).polygon;

					if (J == N - 1 && jType != Geom::G_ARC2) {

						int n = jGeomPoly.get()->size();
						for (int i = 0; i < n; ++i) {
							wykobi::segment<double, 2> tempGeomSegment1, tempGeomSegment2;
							tempGeomSegment1[0] = jGeomPoly->operator[](i);
							tempGeomSegment1[1] = jGeomPoly->operator[](i + 1);

							for (int j = i + 3; j < n; ++j) {

								tempGeomSegment2[0] = jGeomPoly->operator[](j);
								tempGeomSegment2[1] = jGeomPoly->operator[](j + 1);

								if (wykobi::intersect(tempGeomSegment1, tempGeomSegment2)) {
									point = wykobi::intersection_point(tempGeomSegment1, tempGeomSegment2);
									intersectSet.insert(point);
								}
							}
						}
					}
				}
				break;
				}



				switch (iType)
				{
				case Geom::G_LINE:
				{
					switch (jType)
					{
					case Geom::G_LINE:
					{
						if (wykobi::intersect(*(iGeomSegment.get()), *(jGeomSegment.get()))) {
							point = wykobi::intersection_point(*(iGeomSegment.get()), *(jGeomSegment.get()));
							intersectSet.insert(point);
						}
					}
					break;

					case Geom::G_CIRCLE:
					{
						if (wykobi::intersect(*(iGeomSegment.get()), *(jGeomCircle.get()))) {
							IntersectLinesegCircle((*(iGeomSegment.get()))[0].x, (*(iGeomSegment.get()))[0].y, (*(iGeomSegment.get()))[1].x, (*(iGeomSegment.get()))[1].y, (jGeomCircle.get())->x, (jGeomCircle.get())->y, (jGeomCircle.get())->radius, plist);
						}
					}
					break;

					case Geom::G_PLINE:
					case Geom::G_ARC2:
					case Geom::G_SPLINE:
					case Geom::G_POLYGON:
					{

						int n = jGeomPoly.get()->size() - 1;

						if (jType == Geom::G_POLYGON)
							n += 1;

						for (int i = 0; i < n; ++i) {
							wykobi::segment<double, 2> tempGeomSegment;
							tempGeomSegment[0] = jGeomPoly->operator[](i);
							tempGeomSegment[1] = jGeomPoly->operator[](i + 1);

							if (wykobi::intersect(*(iGeomSegment.get()), tempGeomSegment)) {

								point = wykobi::intersection_point(*(iGeomSegment.get()), tempGeomSegment);
								intersectSet.insert(point);
							}
						}
					}
					break;
					}
				}
				break;

				case Geom::G_CIRCLE:
				{
					switch (jType)
					{
					case Geom::G_LINE:
					{
						if (wykobi::intersect(*(jGeomSegment.get()), *(iGeomCircle.get()))) {
							IntersectLinesegCircle((*(jGeomSegment.get()))[0].x, (*(jGeomSegment.get()))[0].y, (*(jGeomSegment.get()))[1].x, (*(jGeomSegment.get()))[1].y, (iGeomCircle.get())->x, (iGeomCircle.get())->y, (iGeomCircle.get())->radius, plist);
						}
					}
					break;

					case Geom::G_CIRCLE:
					{
						if (wykobi::intersect(*(iGeomCircle.get()), *(jGeomCircle.get()))) {
							wykobi::intersection_point(*(iGeomCircle.get()), *(jGeomCircle.get()), point1, point2);
							intersectSet.insert(point1);
							intersectSet.insert(point2);
						}
					}
					break;

					case Geom::G_POLYGON:
					case Geom::G_PLINE:
					case Geom::G_SPLINE:
					case Geom::G_ARC2:
					{
						int n = jGeomPoly.get()->size() - 1;
						if (jType == Geom::G_POLYGON)
							n += 1;

						for (int i = 0; i < n; ++i) {
							wykobi::segment<double, 2> tempGeomSegment;
							tempGeomSegment[0] = jGeomPoly->operator[](i);
							tempGeomSegment[1] = jGeomPoly->operator[](i + 1);

							if (wykobi::intersect(tempGeomSegment, *(iGeomCircle.get()))) {

								IntersectLinesegCircle(tempGeomSegment[0].x, tempGeomSegment[0].y, tempGeomSegment[1].x, tempGeomSegment[1].y, (iGeomCircle.get())->x, (iGeomCircle.get())->y, (iGeomCircle.get())->radius, plist);
							}
						}
					}
					break;
					}
				}
				break;

				case Geom::G_POLYGON:
				case Geom::G_PLINE:
				case Geom::G_SPLINE:
				case Geom::G_ARC2:
				{
					switch (jType)
					{
					case Geom::G_LINE:
					{
						int n = iGeomPoly.get()->size() - 1;
						if (iType == Geom::G_POLYGON)
							n += 1;

						wykobi::segment<double, 2> tempIGeomSegment;
						for (int i = 0; i < n; ++i) {
							tempIGeomSegment[0] = iGeomPoly->operator[](i);
							tempIGeomSegment[1] = iGeomPoly->operator[](i + 1);

							if (wykobi::intersect(tempIGeomSegment, *(jGeomSegment.get()))) {
								point = wykobi::intersection_point(tempIGeomSegment, *(jGeomSegment.get()));
								intersectSet.insert(point);
							}
						}
					}
					break;

					case Geom::G_CIRCLE:
					{
						int n = iGeomPoly.get()->size() - 1;
						if (iType == Geom::G_POLYGON)
							n += 1;

						wykobi::segment<double, 2> tempIGeomSegment;
						for (int i = 0; i < n; ++i) {
							tempIGeomSegment[0] = iGeomPoly->operator[](i);
							tempIGeomSegment[1] = iGeomPoly->operator[](i + 1);
							if (wykobi::intersect(tempIGeomSegment, *(jGeomCircle.get()))) {
								IntersectLinesegCircle(tempIGeomSegment[0].x, tempIGeomSegment[0].y, tempIGeomSegment[1].x, tempIGeomSegment[1].y, (jGeomCircle.get())->x, (jGeomCircle.get())->y, (jGeomCircle.get())->radius, plist);
							}
						}
					}
					break;

					case Geom::G_POLYGON:
					case Geom::G_PLINE:
					case Geom::G_SPLINE:
					case Geom::G_ARC2:
					{
						int n = iGeomPoly.get()->size() - 1;
						int m = jGeomPoly.get()->size() - 1;
						if (iType == Geom::G_POLYGON)
							n += 1;
						if (jType == Geom::G_POLYGON)
							m += 1;

						wykobi::segment<double, 2> tempIGeomSegment, tempJGeomSegment;

						for (int i = 0; i < n; ++i) {
							tempIGeomSegment[0] = iGeomPoly->operator[](i);
							tempIGeomSegment[1] = iGeomPoly->operator[](i + 1);

							for (int j = 0; j < m; ++j) {
								tempJGeomSegment[0] = jGeomPoly->operator[](j);
								tempJGeomSegment[1] = jGeomPoly->operator[](j + 1);

								if (wykobi::intersect(tempIGeomSegment, tempJGeomSegment)) {

									point = wykobi::intersection_point(tempIGeomSegment, tempJGeomSegment);
									intersectSet.insert(point);
								}
							}
						}
					}
					break;
					}

				}
				break;
				}
			}
		}

		/*
		if (iType == Geom::G_LINE) {
			if (jType == Geom::G_LINE) {
				if (wykobi::intersect(*(iGeomSegment.get()), *(jGeomSegment.get()))) {
					point = wykobi::intersection_point(*(iGeomSegment.get()), *(jGeomSegment.get()));
					intersectSet.insert(point);
				}
			}
			else if (jType == Geom::G_CIRCLE) {
				if (wykobi::intersect(*(iGeomSegment.get()), *(jGeomCircle.get()))) {
					IntersectLinesegCircle((*(iGeomSegment.get()))[0].x, (*(iGeomSegment.get()))[0].y, (*(iGeomSegment.get()))[1].x, (*(iGeomSegment.get()))[1].y, (jGeomCircle.get())->x, (jGeomCircle.get())->y, (jGeomCircle.get())->radius, plist);
				}
			}
			else if (jType == Geom::G_ARC2) {
				int n = jGeomPoly.get()->size() - 1;
				for (int i = 0; i < n; ++i) {
					wykobi::segment<double, 2> tempGeomSegment;
					tempGeomSegment[0] = jGeomPoly->operator[](i);
					tempGeomSegment[1] = jGeomPoly->operator[](i + 1);

					if (wykobi::intersect(*(iGeomSegment.get()), tempGeomSegment)) {

						point = wykobi::intersection_point(*(iGeomSegment.get()), tempGeomSegment);
						intersectSet.insert(point);
					}
				}
			}
		}
		else if (iType == Geom::G_CIRCLE) {
			if (jType == Geom::G_LINE) {
				if (wykobi::intersect(*(jGeomSegment.get()), *(iGeomCircle.get()))) {
					IntersectLinesegCircle((*(jGeomSegment.get()))[0].x, (*(jGeomSegment.get()))[0].y, (*(jGeomSegment.get()))[1].x, (*(jGeomSegment.get()))[1].y, (iGeomCircle.get())->x, (iGeomCircle.get())->y, (iGeomCircle.get())->radius, plist);
				}
			}
			else if (jType == Geom::G_CIRCLE) {
				if (wykobi::intersect(*(iGeomCircle.get()), *(jGeomCircle.get()))) {
					wykobi::intersection_point(*(iGeomCircle.get()), *(jGeomCircle.get()), point1, point2);
					intersectSet.insert(point1);
					intersectSet.insert(point2);
				}
			}
			else if (jType == Geom::G_ARC2) {
				int n = jGeomPoly.get()->size() - 1;
				for (int i = 0; i < n; ++i) {
					wykobi::segment<double, 2> tempGeomSegment;
					tempGeomSegment[0] = jGeomPoly->operator[](i);
					tempGeomSegment[1] = jGeomPoly->operator[](i + 1);

					if (wykobi::intersect(tempGeomSegment, *(iGeomCircle.get()))) {

						IntersectLinesegCircle(tempGeomSegment[0].x, tempGeomSegment[0].y, tempGeomSegment[1].x, tempGeomSegment[1].y, (iGeomCircle.get())->x, (iGeomCircle.get())->y, (iGeomCircle.get())->radius, plist);
					}
				}
			}
		}
		else if (iType == Geom::G_ARC2) {
			if (jType == Geom::G_LINE) {
				int n = iGeomPoly.get()->size() - 1;
				for (int i = 0; i < n; ++i) {
					wykobi::segment<double, 2> tempGeomSegment;
					tempGeomSegment[0] = iGeomPoly->operator[](i);
					tempGeomSegment[1] = iGeomPoly->operator[](i + 1);

					if (wykobi::intersect(tempGeomSegment, *(jGeomSegment.get()))) {

						point = wykobi::intersection_point(tempGeomSegment, *(jGeomSegment.get()));
						intersectSet.insert(point);
					}
				}
			}
			else if (jType == Geom::G_CIRCLE) {
				int n = iGeomPoly.get()->size() - 1;
				for (int i = 0; i < n; ++i) {
					wykobi::segment<double, 2> tempGeomSegment;
					tempGeomSegment[0] = iGeomPoly->operator[](i);
					tempGeomSegment[1] = iGeomPoly->operator[](i + 1);

					if (wykobi::intersect(tempGeomSegment, *(jGeomCircle.get()))) {
						IntersectLinesegCircle(tempGeomSegment[0].x, tempGeomSegment[0].y, tempGeomSegment[1].x, tempGeomSegment[1].y, jGeomCircle.get()->x, jGeomCircle.get()->y, jGeomCircle.get()->radius, plist);
					}
				}
			}
			else if (jType == Geom::G_ARC2) {
				int n = iGeomPoly.get()->size() - 1;
				int m = jGeomPoly.get()->size() - 1;
				wykobi::segment<double, 2> tempIGeomSegment, tempJGeomSegment;

				for (int i = 0; i < n; ++i) {
					tempIGeomSegment[0] = iGeomPoly->operator[](i);
					tempIGeomSegment[1] = iGeomPoly->operator[](i + 1);

					for (int j = 0; j < m; ++j) {
						tempJGeomSegment[0] = jGeomPoly->operator[](j);
						tempJGeomSegment[1] = jGeomPoly->operator[](j + 1);

						if (wykobi::intersect(tempIGeomSegment, tempJGeomSegment)) {

							point = wykobi::intersection_point(tempIGeomSegment, tempJGeomSegment);
							intersectSet.insert(point);
						}
					}
				}
						*/

		set<wykobi::point2d<double>>::iterator iter;
		for (iter = intersectSet.begin(); iter != intersectSet.end(); iter++) {
			point1 = *iter;
			plist->AddPoint(point1.x, point1.y, 0);
		}
	}

	void GetGeomEntity(shared_ptr<Geom> geom, shared_ptr<vector<GeomEntity>> geomEntityList)
	{
		Vector3 fp, lp;

		switch (geom->GetType())
		{
		case Geom::G_GROUP:
		{
			shared_ptr<Group> g = dynamic_pointer_cast<Group>(geom);
			int n = g->GetNumberOfChildren();
			for (int i = 0; i < n; ++i)
			{
				GetGeomEntity(g->Get(i), geomEntityList);
			}
		}
		break;

		case Geom::G_CIRCLE:
		{
			shared_ptr<Circle> c = dynamic_pointer_cast<Circle>(geom);
			shared_ptr<wykobi::circle<double>> circle = make_shared<wykobi::circle<double>>();
			circle->radius = c->GetRadius();
			circle->x = c->GetCenter()._x;
			circle->y = c->GetCenter()._y;

			shared_ptr<BoundingBox2> bbox2 = c->GetBoundingBox2();

			geomEntityList->push_back({ circle, NULL, NULL, bbox2, Geom::G_CIRCLE });
		}
		break;

		case Geom::G_ARC2:
		{
			shared_ptr<Arc2> a = dynamic_pointer_cast<Arc2>(geom);
			shared_ptr<Group> g = make_shared<Group>();
			a->GeneratePreview(g);

			int n = g->GetNumberOfChildren();
			for (int i = 0; i < n; ++i) {
				shared_ptr<wykobi::polygon<double, 2>> polygon = make_shared<wykobi::polygon<double, 2>>();
				shared_ptr<PLine> pline = dynamic_pointer_cast<PLine>(g->Get(i));
				int m = pline->GetNumberOfPoints();
				for (int j = 0; j < m; ++j) {
					polygon->push_back(wykobi::make_point<double>(pline->GetPoint(j)._x, pline->GetPoint(j)._y));
				}

				shared_ptr<BoundingBox2> bbox2 = a->GetBoundingBox2();

				geomEntityList->push_back({ NULL, NULL, polygon, bbox2, Geom::G_ARC2 });
			}
		}
		break;

		case Geom::G_LINE:
		{
			shared_ptr<LineSeg> l = dynamic_pointer_cast<LineSeg>(geom);
			shared_ptr<wykobi::segment<double, 2>> segment = make_shared<wykobi::segment<double, 2>>();
			(*segment)[0] = { l->Get(0)._x, l->Get(0)._y };
			(*segment)[1] = { l->Get(1)._x, l->Get(1)._y };

			shared_ptr<BoundingBox2> bbox2 = l->GetBoundingBox2();

			geomEntityList->push_back({ NULL, segment, NULL, bbox2, Geom::G_LINE });
		}
		break;

		case Geom::G_POLYGON:
		case Geom::G_PLINE:
		case Geom::G_SPLINE:
		{
			shared_ptr<Group> g = make_shared<Group>();
			geom->GeneratePreview(g);
			shared_ptr<PLine> p = dynamic_pointer_cast<PLine>(g->Get(0));

			int n = p->GetNumberOfPoints();
			shared_ptr<wykobi::polygon<double, 2>> polygon = make_shared<wykobi::polygon<double, 2>>();

			for (int i = 0; i < n; ++i) {
				polygon->push_back(wykobi::make_point<double>(p->GetPoint(i)._x, p->GetPoint(i)._y));
			}

			shared_ptr<BoundingBox2> bbox2 = p->GetBoundingBox2();

			geomEntityList->push_back({ NULL, NULL, polygon, bbox2, geom->GetType() });
		}
		break;
		}
	}

	cad_type EPS = 0.00000000000001;
#define CHECK_INSIDE(x1,x2,x) ((x1)<=(x) && (x2)>=(x))
#define SWAP(a,b) {cad_type c=a;a=b;b=c;}


	bool IntersectLineCircle(cad_type line1x, cad_type line1y,
		cad_type line2x, cad_type line2y,
		cad_type circlex, cad_type circley, cad_type radius,
		shared_ptr<PointList> plist) {

		bool isV = false;
		cad_type da = (line1x - line2x);
		if (abs(da) < EPS) {
			isV = true;

			if (line2y < line1y) {
				SWAP(line1x, line2x);
				SWAP(line1y, line2y);
			}
		}
		else {
			if (line2x < line1x) {
				SWAP(line1x, line2x);
				SWAP(line1y, line2y);
			}

		}

		cad_type lx1 = line1x - circlex;
		cad_type ly1 = line1y - circley;
		cad_type lx2 = line2x - circlex;
		cad_type ly2 = line2y - circley;


		cad_type a;
		cad_type b;
		cad_type c;
		cad_type r;
		if (abs(da) < EPS) {
			a = 1;
			b = 0;
			c = -lx1;
			r = radius;
		}
		else {
			a = (ly1 - ly2) / da;
			b = -1;
			c = ly1 - a * lx1;
			r = radius;
		}



		//		double r, a, b, c; // given as input
		double x0 = -a * c / (a * a + b * b), y0 = -b * c / (a * a + b * b);
		if (c * c > r * r * (a * a + b * b) + EPS) {
			//puts("no points");
			return false;
		}
		else if (abs(c * c - r * r * (a * a + b * b)) < EPS) {
			//puts("1 point");
			//cout << x0 << ' ' << y0 << '\n';
			cad_type _x1 = x0 + circlex;
			cad_type _y1 = y0 + circley;

			plist->AddPoint(_x1, _y1, 0);
		}
		else {
			double d = r * r - c * c / (a * a + b * b);
			double mult = sqrt(d / (a * a + b * b));
			double ax, ay, bx, by;
			ax = x0 + b * mult;
			bx = x0 - b * mult;
			ay = y0 - a * mult;
			by = y0 + a * mult;


			cad_type _x1 = ax + circlex;
			cad_type _y1 = ay + circley;
			cad_type _x2 = bx + circlex;
			cad_type _y2 = by + circley;

			plist->AddPoint(_x1, _y1, 0);
			plist->AddPoint(_x2, _y2, 0);

		}

		return true;
	}

	bool IntersectLinesegCircle(cad_type line1x, cad_type line1y,
		cad_type line2x, cad_type line2y,
		cad_type circlex, cad_type circley, cad_type radius,
		shared_ptr<PointList> plist) {

		bool isV = false;
		cad_type da = (line1x - line2x);
		if (abs(da) < EPS) {
			isV = true;

			if (line2y < line1y) {
				SWAP(line1x, line2x);
				SWAP(line1y, line2y);
				da = (line1x - line2x);
			}
		}
		else {
			if (line2x < line1x) {
				SWAP(line1x, line2x);
				SWAP(line1y, line2y);
				da = (line1x - line2x);
			}
		}

		cad_type lx1 = line1x - circlex;
		cad_type ly1 = line1y - circley;
		cad_type lx2 = line2x - circlex;
		cad_type ly2 = line2y - circley;


		cad_type a;
		cad_type b;
		cad_type c;
		cad_type r;
		if (abs(da) < EPS) {
			a = 1;
			b = 0;
			c = -lx1;
			r = radius;
		}
		else {
			a = (ly1 - ly2) / da;
			b = -1;
			c = ly1 - a * lx1;
			r = radius;
		}



		//		double r, a, b, c; // given as input
		double x0 = -a * c / (a * a + b * b), y0 = -b * c / (a * a + b * b);
		if (c * c > r * r * (a * a + b * b) + EPS) {
			//puts("no points");
			return false;
		}
		else if (abs(c * c - r * r * (a * a + b * b)) < EPS) {
			//puts("1 point");
			//cout << x0 << ' ' << y0 << '\n';
			cad_type _x1 = x0 + circlex;
			cad_type _y1 = y0 + circley;
			if (isV) {
				if (CHECK_INSIDE(line1y, line2y, _y1)) {
					plist->AddPoint(_x1, _y1, 0);
				}
			}
			else {
				if (CHECK_INSIDE(line1x, line2x, _x1)) {
					plist->AddPoint(_x1, _y1, 0);
				}
			}
		}
		else {
			double d = r * r - c * c / (a * a + b * b);
			double mult = sqrt(d / (a * a + b * b));
			double ax, ay, bx, by;

			ax = x0 + b * mult;
			bx = x0 - b * mult;
			ay = y0 - a * mult;
			by = y0 + a * mult;

			cad_type _x1 = ax + circlex;
			cad_type _y1 = ay + circley;
			cad_type _x2 = bx + circlex;
			cad_type _y2 = by + circley;
			if (isV) {
				if (CHECK_INSIDE(line1y, line2y, _y1)) {
					plist->AddPoint(_x1, _y1, 0);
				}
				if (CHECK_INSIDE(line1y, line2y, _y2)) {
					plist->AddPoint(_x2, _y2, 0);
				}
			}
			else {
				if (CHECK_INSIDE(line1x, line2x, _x1)) {
					plist->AddPoint(_x1, _y1, 0);
				}
				if (CHECK_INSIDE(line1x, line2x, _x2)) {
					plist->AddPoint(_x2, _y2, 0);
				}
			}

			//puts("2 points");
			//cout << ax << ' ' << ay << '\n' << bx << ' ' << by << '\n';
		}



		return true;
	}

	cad_type Vector2Radian(double dx, double dy)
	{
		double rad = atan2(dy, dx);
		double deg = rad / M_PI;
		if (deg < 0)
			deg += 2 * M_PI;

		return deg;
	}


	bool IntersectLinesegArc(cad_type line1x, cad_type line1y,
		cad_type line2x, cad_type line2y,
		cad_type circlex, cad_type circley, cad_type radius,
		cad_type start, cad_type end,
		shared_ptr<PointList> plist) {

		shared_ptr<PointList> plist2 = make_shared<PointList>();

		bool ret = false;

		if (IntersectLinesegCircle(line1x, line1y, line2x, line2y, circlex, circley, radius, plist2)) {
			int len = plist2->GetNumberOfPoints();
			for (int i = len - 1; i >= 0; i--) {
				Vector3 pos = plist2->GetPoint(i);
				cad_type rr = Vector2Radian(pos._x, pos._y);

				if (CHECK_INSIDE(start, end, rr)) {
					plist->AddPoint(pos._x, pos._y, pos._z);
					ret = true;
				}
			}
		}

		return ret;
	}

#ifndef _CPP
	EMSCRIPTEN_BINDINGS(module_lineseg) {
		emscripten::function("IntersectLineCircle", &IntersectLineCircle),
		emscripten::function("GetIntersectionPointList", &GetIntersectionPointList),
		emscripten::function("IsIntersectLinePoint", &IsIntersectLinePoint);
	}

#endif



}