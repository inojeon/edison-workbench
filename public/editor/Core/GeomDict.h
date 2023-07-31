#pragma once
#ifndef GEOM_DICT_H
#define GEOM_DICT_H

#include <map>
#include <mutex>
#include "Geom.h"

using namespace std;
using namespace RayCad;

/// <summary>
/// Geometry 딕셔너리 클래스
/// </summary>
class GeomDict {

public:

	mutex m;
	map<int, map<int, Geom*>> mData;
	static GeomDict& instance();

	/// <summary>
	/// session id, geom id와 매칭하는 geom 객체 포인터를 반환한다
	/// </summary>
	/// <param name="session_id">세션 아이디</param>
	/// <param name="geom_id">geom 아이디</param>
	/// <returns>찾은 geom 객체 포인터</returns>
	Geom* find(int session_id, int geom_id);

	/// <summary>
	/// 해당하는 인덱스에 geom을 추가한다
	/// </summary>
	/// <param name="session_id">세션 아이디</param>
	/// <param name="geom_id">geom 아이디</param>
	/// <param name="geom">추가할 geom</param>
	void insert(int session_id, int geom_id, Geom* geom);

	/// <summary>
	/// 해당하는 인덱스의 geom을 삭제한다
	/// </summary>
	/// <param name="session_id">세션 아이디</param>
	/// <param name="geom_id">geom 아이디</param>
	void erase(int session_id, int geom_id);

	/// <summary>
	/// 해당하는 인덱스의 Geom 데이터를 clear한다
	/// </summary>
	/// <param name="session_id">세션 아이디</param>
	void clear(int session_id);

	/// <summary>
	/// 세션의 개수를 반환한다
	/// </summary>
	/// <returns>세션 수</returns>
	int size();

	/// <summary>
	/// 특정 세션의 geom 개수를 반환한다
	/// </summary>
	/// <param name="session_id">세션 아이디</param>
	/// <returns>geom 개수</returns>
	int size(int session_id);

	/// <summary>
	/// 생성자
	/// </summary>
	GeomDict() {};

private:
	/// <summary>
	/// geom dict 인스턴스
	/// </summary>
	static GeomDict* _instance;
};

/// <summary>
/// geom dict 전역 변수
/// </summary>
extern GeomDict G_GeomDict;
#endif // !GEOM_DICT_H
