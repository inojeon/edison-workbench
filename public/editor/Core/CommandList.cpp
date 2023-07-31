#include "pch.h"

namespace RayCad
{


	CommandList::CommandList() {
		mRootGroup = std::shared_ptr<Group>(new Group());
		mCurrentGroup = mRootGroup;
	}


	void CommandList::_Add(shared_ptr<Geom> geom) {
		mCurrentGroup->Add(geom);
	}



	void CommandList::AddCommand(shared_ptr<Geom> command) {
		if (command != NULL) {
			//printf("command id %d\n", command->GetType());
			if (command->GetType() == Geom::G_GROUP) {
				mCurrentGroup->Add(command);
				PushGroup(dynamic_pointer_cast<Group>(command));
				//printf("group %d\n", command->GetID());
			}
			else if (command->GetType() == Geom::G_ENDGROUP) {
				//printf("end group 22 \n");
				PopGroup();
				//printf("end group \n");
			}
			else {
				mCurrentGroup->Add(command);
			}
		}			
	}


	int CommandList::GetNumberOfCommands() {
		return mRootGroup->_list.size();
	}

	shared_ptr<Geom> CommandList::GetCommand(int index) {
		return mRootGroup->Get(index);
	}


	void CommandList::Clear() {
		while (mGroupStack.size() > 1) {
			mGroupStack.pop();
		}

		mRootGroup->Clear();

	}




	
	shared_ptr<Group> CommandList::PushGroup(shared_ptr<Group> group) {
		mGroupStack.push(mCurrentGroup);
		mCurrentGroup = group;
		return mCurrentGroup;
	}


	void CommandList::PopGroup() {
		if (mGroupStack.size() <= 0) {
			return;
		}

		mCurrentGroup = mGroupStack.top();
		mGroupStack.pop();
	}




#ifndef _CPP
		EMSCRIPTEN_BINDINGS(raycad_commandList) {
			class_<CommandList>("CommandList")
				.smart_ptr_constructor("CommandList", &std::make_shared<CommandList>)

				.function("AddCommand", &RayCad::CommandList::AddCommand)
				.function("_Add", &RayCad::CommandList::_Add)

				.function("GetNumberOfCommands", &RayCad::CommandList::GetNumberOfCommands)
				.function("GetCommand", &RayCad::CommandList::GetCommand)

				.function("PushGroup", &RayCad::CommandList::PushGroup)
				.function("PopGroup", &RayCad::CommandList::PopGroup)
				
				;
		}
#endif
	
}