#pragma once

namespace RayCad
{
	class Geom;
	class Group;

	/// <summary>
	/// CAD 커맨드 리스트 클래스
	/// </summary>
	class CommandList {
	public:
		/// <summary>
		/// 기하 오브젝트를 저장하는 필드
		/// </summary>
		shared_ptr<Group> mRootGroup;

		/// <summary>
		/// 여러 그룹 데이터들을 관리하는 필드
		/// </summary>
		stack<shared_ptr<Group>> mGroupStack;

		/// <summary>
		/// 현재 사용되는 그룹
		/// </summary>
		shared_ptr<Group> mCurrentGroup;

		/// <summary>
		/// 새로운 그룹 시작 문자열
		/// </summary>
		const string cGroup = "Group";

		/// <summary>
		/// 그룹 종료 문자열
		/// </summary>
		const string cEndGroup = "EndGroup";

		/// <summary>
		/// 생성자 : 
		///		mRootGroup >> 기하 데이터를 저장하는 필드
		///		mCommands  >> KRF 형식 문자열을 저장하는 필드
		///		mGroupStack >> 여러 그룹 데이터들을 관리하는 필드
		/// </summary>
		CommandList();

		/// <summary>
		/// CommandList 내 그룹을 모두 지운다
		/// </summary>
		void Clear();

		/// <summary>
		/// geom 객체 추가
		/// </summary>
		/// <param name="geom">추가할 geom 객체</param>
		void AddCommand(shared_ptr<Geom> geom);

		/// <summary>
		/// 현재 그룹에 geom을 추가한다 (단, Group / EndGroup 명령어에 대한 처리를 하지 않는다)
		/// </summary>
		/// <param name="geom">추가할 geom 객체</param>
		void _Add(shared_ptr<Geom> geom);

		/// <summary>
		/// 추가한 command 문자열의 개수 반환
		/// </summary>
		int GetNumberOfCommands();

		/// <summary>
		/// index에 해당하는 Geom 객체 포인터 반환
		/// </summary>
		/// <param name="index">불러올 Geom의 인덱스</param>
		/// <returns>Geom 객체 포인터</returns>
		shared_ptr<Geom> GetCommand(int index);

		/// <summary>
		/// 그룹 추가
		/// </summary>
		/// <param name="group">그룹 데이터가 담긴 포인터</param>
		/// <returns>현재 그룹</returns>
		shared_ptr<Group> PushGroup(shared_ptr<Group> geom);

		/// <summary>
		/// 현재 그룹에 대해 pop 연산을 수행한다
		/// </summary>
		void PopGroup();


	};

}