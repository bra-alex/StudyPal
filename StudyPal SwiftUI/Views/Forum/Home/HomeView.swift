//
//  HomeView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/07/2022.
//

import SwiftUI
import FirebaseAuth

struct HomeView: View {
    
    init() {
        UITabBar.appearance().isHidden = true
    }
    @ObservedObject var user = UserViewModel()
    @State var rootView = false
    @State var signOutAlert = false
    @State private var sideMenuIsShowing = false
    @State var currentTab = "Forum"
    @State var offset: CGFloat = 0
    @State var lastOffset: CGFloat = 0
    @GestureState var gestureOffset: CGFloat = 0
    
    var body: some View {
        let sideBarWidth = getRect().width - 90
        if rootView{
            withAnimation {
                WelcomeScreenView()
            }
        } else {
            NavigationStack {
                ZStack {
                    VStack {
                        HStack(spacing: 0) {
                            SideMenuView(showMenu: $sideMenuIsShowing, signOutAlert: $signOutAlert)
                            VStack(spacing: 0) {
                                TabView(selection: $currentTab){
                                    ForumView(user: user.user, showMenu: $sideMenuIsShowing)
                                        .tag("Forum")
                                    
                                    GroupsView(user: user.user, showMenu: $sideMenuIsShowing)
                                        .tag("Groups")
                                    
                                    MessagesView(showMenu: $sideMenuIsShowing)
                                        .tag("Messages")
                                    
//                                    NotificationsView(showMenu: $sideMenuIsShowing)
//                                    //                                    .navigationBarTitleDisplayMode(.inline)
//                                    //                                    .navigationBarHidden(true)
//                                        .tag("Notifications")
                                }
                                
                                
                                VStack(spacing: 0) {
                                    Divider()
                                    HStack(spacing: 0) {
                                        TabButtons(image: "globe", name: "Forum", tab: $currentTab)
                                        TabButtons(image: "person.2", name: "Groups", tab: $currentTab)
                                        TabButtons(image: "envelope", name: "Messages", tab: $currentTab)
//                                        TabButtons(image: "bell", name: "Notifications", tab: $currentTab)
                                    }.padding(.vertical, 15)
                                }
                            }
                            .frame(width: getRect().width)
                            .overlay{
                                Rectangle()
                                    .fill(
                                        Color.primary
                                            .opacity(Double((offset / sideBarWidth) / 5))
                                    )
                                    .ignoresSafeArea(.container, edges: .vertical)
                                    .onTapGesture {
                                        sideMenuIsShowing.toggle()
                                    }
                            }
                        }
                        .ignoresSafeArea(.keyboard)
                        .blur(radius: signOutAlert ? 10 : 0)
                        .animation(.easeInOut, value: signOutAlert == true)
                        .onDisappear{
                            sideMenuIsShowing = false
                        }
                        .frame(width:  getRect().width + sideBarWidth)
                        .offset(x: -sideBarWidth/2)
                        .offset(x: offset > 0 ? offset : 0)
                        .gesture(
                            DragGesture()
                                .updating($gestureOffset, body: { value, out, _ in
                                    out = value.translation.width
                                })
                                .onEnded(onEnd(value:))
                        )
                        .animation(.spring(), value: offset == 0)
                        .onChange(of: sideMenuIsShowing) { newValue in
                            if sideMenuIsShowing && offset == 0{
                                offset = sideBarWidth
                                lastOffset = offset
                            }
                            
                            if !sideMenuIsShowing && offset == sideBarWidth{
                                offset = 0
                                lastOffset = 0
                            }
                        }
                        .onChange(of: gestureOffset) { newValue in
                            onChange()
                        }
                    }
                    
                    if signOutAlert{
                        SignOutAlertView(bool: $signOutAlert, rootView: $rootView)
                            .transition(AnyTransition.opacity.animation(.easeInOut))
                    }
                }
            }
        }
    }
    
    private func onChange(){
        let sideBarWidth = getRect().width - 90
        
        offset = (gestureOffset != 0) ? (gestureOffset + lastOffset < sideBarWidth ? gestureOffset + lastOffset : offset) : offset
    }
    
    private func onEnd(value: DragGesture.Value){
        let sideBarWidth = getRect().width - 90
        
        let translation = value.translation.width
        
        withAnimation {
            if translation > 0{
                if translation > (sideBarWidth / 2){
                    offset = sideBarWidth
                    sideMenuIsShowing = true
                } else {
                    offset = 0
                    sideMenuIsShowing = false
                }
                
            } else {
                
                if -translation > (sideBarWidth / 2){
                    offset = 0
                    sideMenuIsShowing = false
                } else {
                    offset = sideBarWidth
                    sideMenuIsShowing = true
                }
                
            }
        }
        
        lastOffset = offset
    }
}


struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
