#pragma once

/// <summary>
/// RayCad 클래스 네임스페이스
/// </summary>
namespace RayCad
{
	class PointList;

	/// <summary>
	/// Arc 클래스
	/// </summary>
	class Arc : public Geom {
	public:

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Arc();

        /// <summary>
        /// 호의 중심
        /// </summary>
        Vector3 _center;
		/// <summary>
		/// 호의 반지름
		/// </summary>
		cad_type _radius;
		/// <summary>
		/// 호의 시작 각도
		/// </summary>
		cad_type _angle_st;
		/// <summary>
		/// 호의 끝 각도
		/// </summary>
		cad_type _angle_ed;

		/// <summary>
		/// 호의 중심, 반지름, 호의 각도를 지정한다
		/// </summary>
		/// <param name="x">중심 x 좌표</param>
		/// <param name="y">중심 y 좌표</param>
		/// <param name="z">중심 z 좌표</param>
		/// <param name="radius">호의 반지름</param>
		/// <param name="angle_start">시작 중심 각도</param>
		/// <param name="angle_end">종료 중심 각도</param>
		void Set(cad_type x, cad_type y, cad_type z, cad_type radius, cad_type angle_start, cad_type angle_end);
		
		/// <summary>
		/// 반지름 정보를 가져온다
		/// </summary>
		/// <returns>반지름의 길이</returns>
		cad_type GetRadius();

		/// <summary>
		/// 호의 시작 각도를 가져온다
		/// </summary>
		/// <returns>호의 시작 각도</returns>
		cad_type GetAngleStart();

		/// <summary>
		/// 호의 끝 각도를 가져온다
		/// </summary>
		/// <returns>호의 끝 각도</returns>
		cad_type GetAngleEnd();

		/// <summary>
		/// 호의 중심 x 좌표를 가져온다
		/// </summary>
		/// <returns>호의 중심 x 좌표</returns>
		cad_type GetX();

		/// <summary>
		/// 호의 중심 y 좌표를 가져온다
		/// </summary>
		/// <returns>호의 중심 y 좌표</returns>
		cad_type GetY();

		/// <summary>
		/// 호의 중심 z 좌표를 가져온다
		/// </summary>
		/// <returns>호의 중심 z 좌표</returns>
		cad_type GetZ();

		/// <summary>
		/// 호의 중심 좌표 정보 반환
		/// </summary>
		/// <returns>호의 중심 좌표</returns>
		Vector3 GetCenter();

		/// <summary>
		/// 호의 시작점 계산
		/// </summary>
		/// <returns>시작 좌표</returns>
		Vector3 GetStart();

		/// <summary>
		/// 호의 종료점 계산
		/// </summary>
		/// <returns>종료 좌표</returns>
		Vector3 GetEnd();

		/// <summary>
		/// 2차원 상의 점과 호 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <returns>점과 호 사이의 거리</returns>
		virtual double distance2(double x, double y);

		/// <summary>
		/// 3차원 상의 점과 호 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <param name="z">점의 z 좌표</param>
		/// <returns>점과 호 사이의 거리</returns>
		virtual double distance3(double x, double y, double z);

		/// <summary>
		/// 객체를 복제한다
		/// </summary>
		/// <returns>복제된 객체의 포인터</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 객체 정보에 대한 바이너리를 메모리 블록에 저장한다
		/// </summary>
		/// <param name="data">메모리 블록</param>
		/// <param name="ptr">데이터 저장 지점</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 객체에 대한 바이너리 사이즈를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">태그 포함 여부</param>
		/// <returns>객체 바이너리 사이즈</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 객체의 타입명을 반환한다
		/// </summary>
		/// <returns>객체 타입명</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 객체의 렌더링 프리뷰 추가
		/// </summary>
		/// <param name="preview">렌더링 프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);

		/// <summary>
		/// 오브젝트 피킹 시 근접한 오브젝트를 찾기 위한 지점을 구한다
		/// </summary>
		/// <param name="plist">근접점들을 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);
		
	};
}