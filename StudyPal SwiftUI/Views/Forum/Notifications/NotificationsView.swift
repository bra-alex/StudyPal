//
//  NotificationsView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct NotificationsView: View {
    @ObservedObject var userVM: UserViewModel
    @Binding var showMenu: Bool

    var body: some View {
        VStack {
            NavBar(user: userVM.user, title: "Notifications", showMenu: $showMenu)
            Spacer()
        }
    }
}

struct NotificationsView_Previews: PreviewProvider {
    static var previews: some View {
        NotificationsView(userVM: UserViewModel(), showMenu: .constant(false))
    }
}
