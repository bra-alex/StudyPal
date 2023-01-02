//
//  NewMessageView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 29/07/2022.
//

import SwiftUI

struct NewMessageView: View {
    @Environment(\.dismiss) var dismiss
    @StateObject var newMessageUsers = NewMessageViewModel()
    @State private var query = ""
    
    let selectedUser: (UserInfo) -> ()
    var body: some View {
        NavigationStack {
            List(newMessageUsers.searchUsers(query: query)) {users in
                Button(action: {
                    selectedUser(users)
                    dismiss()
                }, label: {
                    HStack(spacing: 10.0) {
                        AsyncImage(url: URL(string: users.profileImageUrl), content: { image in
                            image.resizable()
                        }, placeholder: {})
                        .scaledToFill()
                        .frame(width: 50, height: 50)
                        .clipped()
                        .cornerRadius(30)
                        VStack(alignment: .leading) {
                            Text((users.name))
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(.primary)
                            
                            Text("@\(users.username)")
                                .font(.subheadline)
                                .foregroundColor(Color.gray)
                            
                        }
                        Spacer()
                    }
                    .padding(.horizontal)
                    .padding(.vertical, 8)
                })
            }
            .listStyle(.plain)
            .searchable(text: $query)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("New Message")
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

struct NewMessageView_Previews: PreviewProvider {
    static var previews: some View {
        NewMessageView(selectedUser: {_ in })
    }
}
