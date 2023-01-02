//
//  NavBar.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct NavBar: View {
    let user: UserInfo?
    let title: String
    
    @Binding var showMenu: Bool
    
    var body: some View {
        VStack {
            HStack {
                Button {
                    withAnimation {
                        showMenu.toggle()
                    }
                } label: {
                    AsyncImage(url: URL(string: user?.profileImageUrl ?? ""), content: { image in
                        image.resizable()
                    }, placeholder: {})
                        .aspectRatio(contentMode: .fill)
                        .foregroundColor(.primary)
                        .frame(width: 35, height: 35)
                        .cornerRadius(45)
                }
                
                Spacer()
            }
            .padding(.horizontal)
            
            Divider()
        }
        .overlay(
            Text(title)
                .font(.title3.bold())
                .frame(height: 15)
        )
        
    }
}

struct NavBar_Previews: PreviewProvider {
    static var previews: some View {
        NavBar(user: UserInfo(name: "", email: "", username: "", profileImageUrl: ""), title: "Forum", showMenu: .constant(false))
    }
}
