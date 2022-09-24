//
//  SideMenuView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 25/07/2022.
//

import SwiftUI
import FirebaseAuth

struct SideMenuView: View {
    @ObservedObject var user = UserViewModel()
    @Binding var showMenu: Bool
    @Binding var signOutAlert: Bool
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            VStack(alignment: .leading, spacing: 15) {
                AsyncImage(url: URL(string: user.user?.profileImageUrl ?? ""), content: { image in
                    image.resizable()
                }, placeholder: {})
                .aspectRatio(contentMode: .fill)
                .frame(width: 65, height: 65)
                .clipShape(Circle())
                
                Text(user.user?.name ?? "")
                    .font(.title2.bold())
                
                Text("@\(user.user?.username ?? "")")
                    .font(.callout)
            }
            .padding(.horizontal)
            .padding(.leading)
            
            ScrollView(.vertical, showsIndicators: false) {
                VStack {
                    VStack(alignment: .leading, spacing: 35) {
                        ForEach(0..<SideMenuViewModel.allCases.count - 1, id: \.self) { option in
                            SideMenuCellView(sideMenuVM: SideMenuViewModel(rawValue: option) ?? .topics, user: user.user)
                        }
                    }
                    .padding()
                    .padding(.leading)
                    .padding(.top, 35)
                    
                    Divider()
                    
                    Button(action: {
                        signOutAlert.toggle()
                    }, label:
                            {
                        HStack(spacing: 16) {
                            Image(systemName: "arrow.left.square")
                                .frame(width: 24, height: 24)
                            Text("Logout")
                                .font(.system(size: 15, weight: .semibold))
                            Spacer()
                        }
                        .foregroundColor(.primary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                        .padding(.leading)
                        
                    })
                }
            }
            
        }
        
        .padding(.vertical)
        .frame(maxWidth: .infinity, alignment: .leading)
        
        .frame(width: getRect().width - 90)
        .frame(maxHeight: .infinity)
        .background(
            Color.primary
                .opacity(0.04)
                .ignoresSafeArea(.container, edges: .vertical )
        )
        .frame(maxWidth: .infinity, alignment: .leading)
        
    }
}

struct SideMenuView_Previews: PreviewProvider {
    static var previews: some View {
        SideMenuView(showMenu: .constant(true), signOutAlert: .constant(false))
    }
}

extension View{
    func getRect() -> CGRect{
        return UIScreen.main.bounds
    }
}
