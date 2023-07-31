#pragma once

namespace RayCad
{
	class Mesh;

	/// <summary>
	/// 3D 메쉬 빌더 클래스
	/// </summary>
	class MeshBuilder  {
	public:

		/// <summary>
		/// 버텍스 리스트
		/// </summary>
		vector <double> _vertex;
		
		/// <summary>
		/// 인덱스 리스트
		/// </summary>
		vector<int> _index;

		/// <summary>
		/// 클래스 생성자
		/// </summary>
		MeshBuilder();
		
		/// <summary>
		/// 클래스 소멸자
		/// </summary>
		~MeshBuilder();

		/// <summary>
		/// mesh builder를 삭제한다
		/// </summary>
		void Destroy();

		/// <summary>
		/// vertex를 설정한다
		/// </summary>
		/// <param name="index">vertex 인덱스</param>
		/// <param name="x">vertex의 x 좌표</param>
		/// <param name="y">vertex의 y 좌표</param>
		/// <param name="z">vertex의 z 좌표</param>
		void SetVertex(int index, cad_type x, cad_type y, cad_type z);

		/// <summary>
		/// 삼각형을 설정한다
		/// </summary>
		/// <param name="index">삼각형의 인덱스</param>
		/// <param name="t1">vertex 인덱스 1</param>
		/// <param name="t2">vertex 인덱스 2</param>
		/// <param name="t3">vertex 인덱스 3</param>
		void SetTri(int index, int t1, int t2, int t3);


		/// <summary>
		/// mesh를 생성한다
		/// </summary>
		/// <returns>mesh의 스마트 포인터</returns>
		shared_ptr <Mesh> Generate();

		/// <summary>
		/// vertex의 갯수를 반환한다
		/// </summary>
		/// <returns>vertex 갯수</returns>
		int GetNumVertex() {
			return _vertex.size()/3;
		}

		/// <summary>
		/// index 개수를 반환한다
		/// </summary>
		/// <returns>index 개수</returns>
		int GetNumIndex() {
			return _index.size()/3;
		}

	};
}
