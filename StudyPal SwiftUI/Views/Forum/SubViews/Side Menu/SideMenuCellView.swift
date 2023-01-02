//
//  SideMenuCellView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 25/07/2022.
//

import SwiftUI

struct SideMenuCellView: View {
    let sideMenuVM: SideMenuViewModel
    let user: UserInfo?
    
    var body: some View {
        NavigationLink(
            destination: sideMenuVM.view
                .navigationTitle(sideMenuVM.viewName)
        ) {
            HStack(spacing: 16) {
                Image(systemName: sideMenuVM.imageName)
                    .frame(width: 24, height: 24)
                Text(sideMenuVM.title)
                    .font(.system(size: 15, weight: .semibold))
                Spacer()
            }
            .foregroundColor(.primary)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

struct SideMenuCellView_Previews: PreviewProvider {
    static var previews: some View {
        SideMenuCellView(sideMenuVM: .profile, user: .none)
    }
}
