#include "pch.h"
#include "distance.h"
#include "raycad.h"

using namespace wykobi;

namespace RayWycobi {

		double  DistLinesegPoint2(double line_sx, double line_sy, double line_ex, double line_ey, double point_x, double point_y) {

			wykobi::segment<cad_type, 2> _line;
			_line[0][0] = line_sx;
			_line[0][1] = line_sy;

			_line[1][0] = line_ex;
			_line[1][1] = line_ey;


			point2d<double> p1 = make_point<double>(point_x, point_y);

			point2d<double> p2 = closest_point_on_segment_from_point(_line, p1);

			double distance = sqrt((p1.x - p2.x)* (p1.x - p2.x) + (p1.y - p2.y)* (p1.y - p2.y));

			return distance;
		}
		
		double  DistLinesegPoint3(double line_sx, double line_sy, double line_sz, double line_ex, double line_ey, double line_ez, double point_x, double point_y, double point_z) {
			wykobi::segment<cad_type, 3> _line;
			wykobi::point3d<cad_type> p1 = make_point<cad_type>(point_x, point_y, point_z);

			_line[0][0] = line_sx;
			_line[0][1] = line_sy;
			_line[0][2] = line_sz;

			_line[1][0] = line_ex;
			_line[1][1] = line_ey;
			_line[1][2] = line_ez;

			point3d<double> p2 = closest_point_on_segment_from_point(_line, p1);
			return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2) + pow(p1.z - p2.z, 2));
		}

		double  DistPointPoint2(double point1_x, double point1_y, double point2_x, double point2_y) {
			return sqrt(pow(point1_x - point2_x, 2) + pow(point1_y - point2_y, 2));
		}

		double DistPointPoint3(double point1_x, double point1_y, double point1_z, double point2_x, double point2_y, double point2_z) {
			return sqrt(pow(point1_x - point2_x, 2) + pow(point1_y - point2_y, 2) + pow(point1_z - point2_z, 2));
		}

		double DistPointCircle2(double point1_x, double point1_y, double circle_x, double circle_y, double circle_r) {
			wykobi::point2d<cad_type> point = wykobi::make_point<cad_type>(point1_x, point1_y);
			wykobi::circle<cad_type> _circle = wykobi::make_circle(circle_x, circle_y, circle_r);
			wykobi::point2d<cad_type> closest_point = wykobi::closest_point_on_circle_from_point(_circle, point);
			
			return wykobi::distance(closest_point, point);
		}

		double DistPointSphere3(double point1_x, double point1_y, double point1_z, double sphere_x, double sphere_y, double sphere_z, double sphere_r) {
			wykobi::sphere<cad_type> _sphere = wykobi::make_sphere(sphere_x, sphere_y, sphere_z, sphere_r);
			wykobi::point3d<cad_type> point = wykobi::make_point<double>(point1_x, point1_y, point1_z);
			wykobi::point3d<cad_type> closest_point = wykobi::closest_point_on_sphere_from_point(_sphere, point);
			return wykobi::distance(point, closest_point);
		}

		double DistPointRectangle2(double point_x, double point_y, double rect_x1, double rect_y1, double rect_x2, double rect_y2) {
			wykobi::rectangle<cad_type> _rect = make_rectangle(rect_x1, rect_y1, rect_x2, rect_y2);
			wykobi::point2d<cad_type> point = make_point<double>(point_x, point_y);
			wykobi::point2d<cad_type> closest_point = wykobi::closest_point_on_rectangle_from_point(_rect, point);
			return wykobi::distance(point, closest_point);
		}

	
		double GetRayToLineSegmentIntersection(RayCad::Vector3 origin, RayCad::Vector3 dir, RayCad::Vector3 p1, RayCad::Vector3 p2)
		{
			RayCad::Vector3 v1 = origin - p1;
			RayCad::Vector3 v2 = p2 - p1;
			RayCad::Vector3 v3(-dir._y, dir._x, 0);

			double dot = v2.Dot(v3);

			if (abs(dot) < 0.000001)
				return -1.0f;

			RayCad::Vector3 c21 = v2.Cross(v1);
			double t1 = c21._z / dot;
			float t2 = v1.Dot(v3) / dot;

			if (t1 >= 0.0 && (t2 >= 0.0 && t2 <= 1.0))
				return t1;

			return -1.0;
		}

		double DistLineLine3(RayCad::Vector3 o1, RayCad::Vector3 v1, RayCad::Vector3 o2, RayCad::Vector3 v2) 
		{
			v1.Normalize();
			v2.Normalize();

			RayCad::Vector3 nv = v1.Cross(v2);
			if (nv.Length() < 0.001)
			{
				nv = v1;
			}

			double d1 = nv._x * o1._x + nv._y * o1._y + nv._z * o1._z;
			double d2 = nv._x * o2._x + nv._y * o2._y + nv._z * o2._z;

			return abs(d1 - d2);
		}

		double DistRaySegment3(RayCad::Vector3 ro, RayCad::Vector3 rd, RayCad::Vector3 p1, RayCad::Vector3 p2)
		{
			RayCad::Vector3 v1 = rd;
			RayCad::Vector3 v2 = p2 - p1;

			v1.Normalize();
			v2.Normalize();
			RayCad::Vector3 nv = v1.Cross(v2);

			// parrellel segment : return dist on parallel.
			if (nv.Length() < 0.001)
			{
				nv = v1;
				double d1 = nv._x * ro._x + nv._y * ro._y + nv._z * ro._z;
				double d2 = nv._x * p1._x + nv._y * p1._y + nv._z * p1._z;
				return abs(d2 - d1);
			}

			// find nearest point of line-line.
			double d1 = nv._x * ro._x + nv._y * ro._y + nv._z * ro._z;
			double d2 = nv._x * p1._x + nv._y * p1._y + nv._z * p1._z;
			double min_dist = abs(d2 - d1);

			wykobi::point3d<cad_type> seg1 = wykobi::make_point(p1._x, p1._y, p1._z);
			wykobi::point3d<cad_type> seg2 = wykobi::make_point(p2._x, p2._y, p2._z);
			wykobi::plane<cad_type, 3> splane = wykobi::make_plane(seg1, wykobi::make_vector(nv._x, nv._y, nv._z));
			wykobi::point3d<cad_type> spro = closest_point_on_plane_from_point(splane, wykobi::make_point(ro._x, ro._y, ro._z));
			wykobi::point3d<cad_type> sprt = wykobi::make_point(spro.x + v1._x * 100000, spro.y + v1._y * 100000, spro.z + v1._z * 100000);
			
			wykobi::point3d<cad_type> spintp = wykobi::intersection_point(wykobi::make_line(spro, sprt), wykobi::make_line(seg1, seg2), 0.001);

			RayCad::Vector3 segv(spintp.x - seg1.x, spintp.y - seg1.y, spintp.z - seg1.z);

			RayCad::Vector3 sp(spintp.x, spintp.y, spintp.z);
			RayCad::Vector3 rp(spintp.x + nv._x * min_dist, spintp.y + nv._y * min_dist, spintp.z + nv._z * min_dist);

			if (segv.Dot(v2) < 0)
			{
				sp = p1;
			}
			else if (segv.Length() > (p2 - p1).Length())
			{
				sp = p2;
			}
			else
			{
				return min_dist;
			}

			return (sp - rp).Length();
		}


	#ifndef _CPP

		EMSCRIPTEN_BINDINGS(distance) {
			emscripten::function("DistLinesegPoint2", &RayWycobi::DistLinesegPoint2);
			emscripten::function("DistLinesegPoint3", &DistLinesegPoint3);
			emscripten::function("DistPointPoint2", &DistPointPoint2);
			emscripten::function("DistPointPoint3", &DistPointPoint3);
			emscripten::function("DistPointCircle2", &DistPointCircle2);
			emscripten::function("DistPointSphere3", &DistPointSphere3);
			emscripten::function("DistPointRectangle2", &DistPointRectangle2);
			emscripten::function("DistLineLine3", &DistLineLine3);

	}
		
	#endif
	

}