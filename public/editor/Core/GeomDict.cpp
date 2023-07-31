#include "pch.h"
#include "GeomDict.h"

GeomDict G_GeomDict;

GeomDict* GeomDict::_instance;

/// <summary>
/// �̱��� ��ü �ν��Ͻ��� �޾ƿ���
/// </summary>
/// <returns>GeomDict ��ü</returns>
GeomDict& GeomDict::instance()
{
    if (_instance == NULL) {
        _instance = new GeomDict();
    }

    return *_instance;
}

/// <summary>
/// �־��� ���� ���̵�� Geom ���̵� �������� ���� ������Ʈ �����͸� ��ȯ
/// </summary>
/// <param name="session_id">�˻��� ���� ���̵�</param>
/// <param name="geom_id">�˻��� Geom ���̵�</param>
/// <returns>Geom ��ü�� ������</returns>
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
/// �־��� ���� ���̵�� Geom ���̵� �������� GeomDict�� geom�� �߰�
/// </summary>
/// <param name="session_id">geom�� ���� �ִ� ����</param>
/// <param name="geom_id">geom�� ������ ���̵�</param>
/// <param name="geom">geom ��ü ������</param>
void GeomDict::insert(int session_id, int geom_id, Geom* geom)
{
    lock_guard<mutex> lock(m);
    mData[session_id].insert(pair<int, Geom*>(geom_id, geom));
}

/// <summary>
/// ���� ���̵��� �־��� ��ü�� �����
/// </summary>
/// <param name="session_id">geom_id�� �����ϴ� ���� �ѹ�</param>
/// <param name="geom_id">���� geom�� id ��</param>
void GeomDict::erase(int session_id, int geom_id)
{
    lock_guard<mutex> lock(m);
     mData[session_id].erase(geom_id);
}

/// <summary>
/// ���� ���̵� �ش��ϴ� GeomDict�� ����
/// </summary>
/// <param name="session_id">��� ���� ���̵�</param>
void GeomDict::clear(int session_id)
{
    lock_guard<mutex> lock(m);
    mData[session_id].clear();
}

/// <summary>
/// GeomDict���� �����Ǵ� ���� ���� ��ȯ
/// </summary>
/// <returns>���� ����</returns>
int GeomDict::size()
{
    lock_guard<mutex> lock(m);
    return mData.size();
}

/// <summary>
/// ���� ���̵� �ش��ϴ� GeomDict �������� ũ�� ��ȯ
/// </summary>
/// <returns>���� ���̵� �ش��ϴ� mData�� ũ��</returns>
int GeomDict::size(int session_id)
{
    lock_guard<mutex> lock(m);
    return mData[session_id].size();
}