#pragma once

namespace RayCad
{
	class PointList;

	/// <summary>
	/// 3D Sphere Geometry 클래스
	/// </summary>
	class Sphere : public Geom {
	public:

		/// <summary>
		/// 중심점
		/// </summary>
		Vector3 _center;
		
		/// <summary>
		/// 반지름
		/// </summary>
		cad_type _radius;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Sphere();

		/// <summary>
		/// 구체의 중심 좌표와 반지름을 설정
		/// </summary>
		/// <param name="x"></param>
		/// <param name="y"></param>
		/// <param name="z"></param>
		/// <param name="radius"></param>
		void Set(cad_type x, cad_type y, cad_type z, cad_type radius);

		/// <summary>
		/// 구의 중심점을 반환한다
		/// </summary>
		/// <returns>구의 중심점</returns>
		Vector3 GetCenter() {
			return _center;
		}

		/// <summary>
		/// 구의 반지름을 반환한다
		/// </summary>
		/// <returns>구의 반지름</returns>
		cad_type GetRadius() {
			return _radius;
		}

		void SetRadius(cad_type radius) {
			_radius = radius;
		}

		/// <summary>
		/// 중심 좌표의 x 값을 반환한다
		/// </summary>
		/// <returns>중심 x 좌표</returns>
		cad_type GetX() { return _center._x; }
		/// <summary>
		/// 중심 좌표의 y 값을 반환한다
		/// </summary>
		/// <returns>중심 y 좌표</returns>
		cad_type GetY() { return _center._y; }
		/// <summary>
		/// 중심 좌표의 z 값을 반환한다
		/// </summary>
		/// <returns>중심 z 좌표</returns>
		cad_type GetZ() { return _center._z; }

		/// <summary>
		/// 기하 오브젝트와 점 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <param name="z">점의 z 좌표</param>
		/// <returns>점과 기하 오브젝트 사이의 거리</returns>
		virtual double distance3(double x, double y, double z);

		/// <summary>
		/// 객체를 복제한다
		/// </summary>
		/// <returns>복제된 객체의 포인터</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 메모리 블럭에 구에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">구의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 구의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 프리뷰 렌더링을 할 오브젝트 생성
		/// </summary>
		/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);
	};
}
