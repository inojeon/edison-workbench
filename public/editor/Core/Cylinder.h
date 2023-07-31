#pragma once

namespace RayCad
{
	class PointList;

	/// <summary>
	/// 3D 실린더 클래스
	/// </summary>
	class Cylinder : public Geom {
	public:

		/// <summary>
		/// 실린더 하부 중심점
		/// </summary>
		Vector3 _p1;
		/// <summary>
		/// 실린더 상부 중심점
		/// </summary>
		Vector3 _p2;
		/// <summary>
		/// 실린더 반지름
		/// </summary>
		cad_type _radius;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Cylinder();

		/// <summary>
		/// 실린더의 하부 중심점과 상부 중심점을 설정한다
		/// </summary>
		/// <param name="p1x">하부 중심점의 x 좌표</param>
		/// <param name="p1y">하부 중심점의 y 좌표</param>
		/// <param name="p1z">하부 중심점의 z 좌표</param>
		/// <param name="p2x">상부 중심점의 x 좌표</param>
		/// <param name="p2y">상부 중심점의 y 좌표</param>
		/// <param name="p2z">상부 중심점의 z 좌표</param>
		/// <param name="radius">실린더 반지름</param>
		void Set(cad_type p1x, cad_type p1y, cad_type p1z, cad_type p2x, cad_type p2y, cad_type p2z, cad_type radius);

		/// <summary>
		/// 실린더의 하부 중심점을 반환한다
		/// </summary>
		/// <returns>하부 중심점</returns>
		Vector3 GetPosition1() {
			return _p1;
		}

		/// <summary>
		/// 실린더의 상부 중심점을 반환한다
		/// </summary>
		/// <returns>상부 중심점</returns>
		Vector3 GetPosition2() {
			return _p2;
		}

		/// <summary>
		/// 실린더의 반지름을 반환한다
		/// </summary>
		/// <returns>반지름</returns>
		cad_type GetRadius() {
			return _radius;
		}

		/// <summary>
		/// 실린더의 중심 x 좌표를 반환한다
		/// </summary>
		/// <returns>중심 x 값</returns>
		cad_type GetCenterX() { 
			return (_p1._x + _p2._x) / 2;
		}

		/// <summary>
		/// 실린더의 중심 y 좌표를 반환한다
		/// </summary>
		/// <returns>중심 y 값</returns>
		cad_type GetCenterY() {
			return (_p1._y + _p2._y) / 2;
		}

		/// <summary>
		/// 실린더의 중심 z 좌표를 반환한다
		/// </summary>
		/// <returns>중심 z 값</returns>
		cad_type GetCenterZ() {
			return (_p1._z + _p2._z) / 2;
		}

		/// <summary>
		/// 3차원 상의 점과 실린더 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <param name="z">점의 z 좌표</param>
		/// <returns>점과 실린더 사이의 거리</returns>
		virtual double distance3(double x, double y, double z);

		/// <summary>
		/// 객체를 복제한다
		/// </summary>
		/// <returns>복제된 객체의 포인터</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 메모리 블럭에 실린더에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">실린더의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 실린더의 정보를 바이너리로 변환 시 크기를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);
	
		/// <summary>
		/// 객체의 렌더링 프리뷰 추가
		/// </summary>
		/// <param name="preview">렌더링 프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);
	};
}

