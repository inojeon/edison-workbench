#include "pch.h"


namespace RayCad {

	MeshBuilder::MeshBuilder() {
	}

	MeshBuilder::~MeshBuilder() {
		Destroy();
	}



	void MeshBuilder::Destroy() {
	}



	void MeshBuilder::SetVertex(int index, cad_type x, cad_type y, cad_type z) {
		int idx = index * 3;
		_vertex[idx + 0] = x;
		_vertex[idx + 1] = y;
		_vertex[idx + 2] = z;
	}

	void MeshBuilder::SetTri(int index, int t1, int t2, int t3) {
		int idx = index * 3;
		_index[idx + 0] = t1;
		_index[idx + 1] = t2;
		_index[idx + 2] = t3;
	}

	shared_ptr <Mesh> MeshBuilder::Generate() {

		auto cg = std::shared_ptr<Mesh>(new Mesh());

		int numvert = GetNumVertex();
		int numidx = GetNumIndex();
		cg->Init(numvert, numidx);

		for (int i = 0; i < numvert; i++) {
			int idx = i * 3;
			cg->SetVertex(i, _vertex[idx + 0], _vertex[idx + 1], _vertex[idx + 2]);
		}

		for (int i = 0; i < numidx; i++) {
			int idx = i * 3;
			cg->SetTri(i, _index[idx + 0], _index[idx + 1], _index[idx + 2]);
		}

		return cg;
	}


#ifndef _CPP

#endif


}