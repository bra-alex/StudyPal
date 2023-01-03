//
//  NewGroupView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 17/08/2022.
//

import SwiftUI

struct NewGroupView: View {
    @Environment(\.dismiss) var dismiss
    
    @ObservedObject var groupChatVM: GroupChatViewModel
    @Binding var createComplete: Bool
    
    let user: UserInfo?
    
    init(user: UserInfo?, createComplete: Binding<Bool>) {
        self.user = user
        self.groupChatVM = .init(users: user)
        self._createComplete = createComplete
    }
    
    var body: some View {
        NavigationView {
            VStack {
                VStack {
                    Text ("Join New Group")
                        .font (.title)
                    TextField("Join code", text: $groupChatVM.joinCode)
                    Button {
                        groupChatVM.joinGroup(code: groupChatVM.joinCode) {
                            self.createComplete.toggle()
                        }
                    } label: {
                        Text ("Join")
                    }
                    
                }
                
                VStack {
                    Text ("Create New Group")
                        .font (.title)
                    TextField("Title", text: $groupChatVM.title )
                    Button {
                        groupChatVM.createGroup(title: groupChatVM.title) {
                            self.createComplete.toggle()
                        }
                    } label: {
                        Text ("Create")
                    }
                }
            }
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("New Group")
                        .fontWeight(.black)
                }
                
                ToolbarItemGroup(placement: .navigationBarLeading) {
                    Button {
                        dismiss()
                    } label: {
                        Text("Cancel")
                            .foregroundColor(.primary)
                    }
                }
            }
        }
    }
}

struct NewGroupView_Previews: PreviewProvider {
    static var previews: some View {
        NewGroupView(user: .none, createComplete: .constant(false))
    }
}
