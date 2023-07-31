#include "pch.h"
#include "GeomDict.h"

GeomDict G_GeomDict;

GeomDict* GeomDict::_instance;

/// <summary>
/// 싱글톤 객체 인스턴스를 받아오기
/// </summary>
/// <returns>GeomDict 객체</returns>
GeomDict& GeomDict::instance()
{
    if (_instance == NULL) {
        _instance = new GeomDict();
    }

    return *_instance;
}

/// <summary>
/// 주어진 세션 아이디와 Geom 아이디를 바탕으로 기하 오브젝트 포인터를 반환
/// </summary>
/// <param name="session_id">검색할 세션 아이디</param>
/// <param name="geom_id">검색할 Geom 아이디</param>
/// <returns>Geom 객체의 포인터</returns>
Geom* GeomDict::find(int session_id, int geom_id)
{
    lock_guard<mutex> lock(m);
    try{
        return mData[session_id][geom_id];
    }
    catch (exception e) 
    {
        return NULL;
    }
}

/// <summary>
/// 주어진 세션 아이디와 Geom 아이디를 바탕으로 GeomDict에 geom을 추가
/// </summary>
/// <param name="session_id">geom이 속해 있는 세션</param>
/// <param name="geom_id">geom에 배정할 아이디</param>
/// <param name="geom">geom 객체 포인터</param>
void GeomDict::insert(int session_id, int geom_id, Geom* geom)
{
    lock_guard<mutex> lock(m);
    mData[session_id].insert(pair<int, Geom*>(geom_id, geom));
}

/// <summary>
/// 세션 아이디의 주어진 객체를 지운다
/// </summary>
/// <param name="session_id">geom_id가 존재하는 세션 넘버</param>
/// <param name="geom_id">지울 geom의 id 값</param>
void GeomDict::erase(int session_id, int geom_id)
{
    lock_guard<mutex> lock(m);
     mData[session_id].erase(geom_id);
}

/// <summary>
/// 세션 아이디에 해당하는 GeomDict를 비운다
/// </summary>
/// <param name="session_id">비울 세션 아이디</param>
void GeomDict::clear(int session_id)
{
    lock_guard<mutex> lock(m);
    mData[session_id].clear();
}

/// <summary>
/// GeomDict에서 관리되는 세션 개수 반환
/// </summary>
/// <returns>세션 개수</returns>
int GeomDict::size()
{
    lock_guard<mutex> lock(m);
    return mData.size();
}

/// <summary>
/// 세션 아이디에 해당하는 GeomDict 데이터의 크기 반환
/// </summary>
/// <returns>세션 아이디에 해당하는 mData의 크기</returns>
int GeomDict::size(int session_id)
{
    lock_guard<mutex> lock(m);
    return mData[session_id].size();
}