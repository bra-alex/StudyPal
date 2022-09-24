//
//  NotificationsView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct NotificationsView: View {
    @Binding var showMenu: Bool
    var body: some View {
        VStack {
            NavBar(showMenu: $showMenu, title: "Notifications")
            Spacer()
        }
    }
}

struct NotificationsView_Previews: PreviewProvider {
    static var previews: some View {
        NotificationsView(showMenu: .constant(false))
    }
}
