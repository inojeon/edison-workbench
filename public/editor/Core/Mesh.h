#pragma once

namespace RayCad
{
	class PointList;

	/// <summary>
	/// 3D 메쉬 클래스
	/// </summary>
	class Mesh : public Geom {
	public:
		/// <summary>
		/// tris 갯수
		/// </summary>
		int _num_tris;
		/// <summary>
		/// uv 갯수
		/// </summary>
		int _num_uv;
		/// <summary>
		/// vertex 갯수
		/// </summary>
		int _num_vertex;

		/// <summary>
		/// vertex 데이터
		/// </summary>
		cad_type* _vertex;

		/// <summary>
		/// normal 데이터
		/// </summary>
		cad_type* _normal;

		/// <summary>
		/// uv 데이터
		/// </summary>
		cad_type* _uv;

		/// <summary>
		/// 인덱스 데이터
		/// </summary>
		int* _index;

		/// <summary>
		/// 생성자 : 객체의 타입을 지정한다
		/// </summary>
		Mesh();

		
		~Mesh();

		/// <summary>
		/// 메쉬의 vertex와 index 개수를 초기화한다
		/// </summary>
		/// <param name="num_vertex">vertex 개수</param>
		/// <param name="num_index">index 개수</param>
		void Init(int num_vertex, int num_index);

		/// <summary>
		/// 메쉬의 normal을 생성한다
		/// </summary>
		void CreateNormal();

		/// <summary>
		/// 메쉬의 UV를 생성한다
		/// </summary>
		void CreateUV();

		/// <summary>
		/// 메쉬를 삭제한다
		/// </summary>
		void Destroy();

		/// <summary>
		/// vertex를 설정한다
		/// </summary>
		/// <param name="index">vertex의 인덱스</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void SetVertex(int index, cad_type x, cad_type y, cad_type z);

		/// <summary>
		/// normal을 설정한다
		/// </summary>
		/// <param name="index">normal의 인덱스</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void SetNormal(int index, cad_type x, cad_type y, cad_type z);

		/// <summary>
		/// uv를 설정한다
		/// </summary>
		/// <param name="index">uv 인덱스</param>
		/// <param name="u">u</param>
		/// <param name="v">v</param>
		void SetUV(int index, cad_type u, cad_type v);

		/// <summary>
		/// 인덱스 배열을 설정한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <param name="t1">vertex 인덱스 1</param>
		/// <param name="t2">vertex 인덱스 2</param>
		/// <param name="t3">vertex 인덱스 3</param>
		void SetTri(int index, int t1, int t2, int t3);

		/// <summary>
		/// vertex의 개수를 반환한다
		/// </summary>
		/// <returns>vertex 개수</returns>
		int GetNumVertex() {
			return _num_vertex;
		}
		
		/// <summary>
		/// triangle의 개수를 반환한다
		/// </summary>
		/// <returns>triangle 개수</returns>
		int GetNumTris() {
			return _num_tris;
		}

		/// <summary>
		/// UV 여부를 반환한다
		/// </summary>
		/// <returns>UV 여부</returns>
		bool IsUV(){
			return _uv != NULL;
		}

		/// <summary>
		/// UV의 개수를 반환한다
		/// </summary>
		/// <returns>UV 개수</returns>
		int GetNumUV() {
			return _num_uv;
		}

		/// <summary>
		/// raw index에 해당하는 vertex 정보를 가져온다
		/// </summary>
		/// <param name="raw_idx">vertex raw index</param>
		/// <returns>vertex 정보</returns>
		cad_type GetVertexData(int raw_idx);

		/// <summary>
		/// raw index에 해당하는 uv 정보를 가져온다
		/// </summary>
		/// <param name="raw_idx">uv raw index</param>
		/// <returns>uv 정보</returns>
		cad_type GetUVData(int raw_idx);

		/// <summary>
		/// raw index에 해당하는 tri 정보를 가져온다
		/// </summary>
		/// <param name="raw_idx">tri raw index</param>
		/// <returns>tri 정보</returns>
		int GetTriIndex(int raw_idx);

		/// <summary>
		/// mesh와 주어진 좌표 사이의 거리를 구한다 (미구현)
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		/// <returns>mesh와 좌표 사이의 거리</returns>
		virtual double distance3(double x, double y, double z);

		/// <summary>
		/// mesh를 복제한다
		/// </summary>
		/// <returns>복제한 mesh</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 타입 이름을 반환한다
		/// </summary>
		/// <returns>'Mesh'</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 메모리 블록의 정해진 위치에 mesh binary를 write한다
		/// </summary>
		/// <param name="data">write할 memory block</param>
		/// <param name="ptr">memory block ptr index</param>
		/// <returns>write 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// mesh의 바이너리 사이즈를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 포함 여부</param>
		/// <returns>mesh 바이너리 사이즈</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// mesh의 preview를 생성한다 (미완성)
		/// </summary>
		/// <param name="preview">preview 객체가 담길 group</param>
		/// <returns>생성 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);
	};
}
