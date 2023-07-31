#pragma once


namespace RayCad
{
	class Geom2D;

	namespace Global
	{
		/// <summary>
		/// Circle 표현시 segment 개수
		/// </summary>
		extern int sCircleSeg;
		
		/// <summary>
		/// Arc 표현시 segment 개수
		/// </summary>
		extern int sArcSeg;
		
		/// <summary>
		/// non-segment 타입 정의 리스트
		/// </summary>
		extern set<int> sNonSegmentType;

		/// <summary>
		/// 
		/// </summary>
		extern Matrix4 sUCSTr;
		
		/// <summary>
		/// 
		/// </summary>
		extern Matrix4 sUCSTrInv;

		/// <summary>
		/// 평면 상의 Geometry를 UCS 좌표계로 옮긴다
		/// </summary>
		/// <param name="normal">ucs 좌표계의 normal</param>
		/// <param name="center">ucs 좌표계의 center</param>
		void SetGeom2DUCSTransform(Vector3 normal, Vector3 center);

		/// <summary>
		/// UCS 글로벌 좌표계를 로컬 좌표계로 옮긴다
		/// </summary>
		/// <param name="x">글로벌 x 좌표</param>
		/// <param name="y">글로벌 y 좌표</param>
		/// <param name="z">글로벌 z 좌표</param>
		/// <param name="lx">로컬 x 좌표</param>
		/// <param name="ly">로컬 y 좌표</param>
		/// <param name="lz">로컬 z 좌표</param>
		void UCSGlobalToLocal(double x, double y, double z, double &lx, double &ly, double &lz);

		/// <summary>
		/// UCS 로컬 좌표계를 글로벌 좌표계로 옮긴다
		/// </summary>
		/// <param name="lx">로컬 x 좌표</param>
		/// <param name="ly">로컬 y 좌표</param>
		/// <param name="lz">로컬 z 좌표</param>
		/// <param name="x">글로벌 x 좌표</param>
		/// <param name="y">글로벌 y 좌표</param>
		/// <param name="z">글로벌 z 좌표</param>
		void UCSLocalToGlobal(double lx, double ly, double lz, double &x, double &y, double &z);
	}
}

