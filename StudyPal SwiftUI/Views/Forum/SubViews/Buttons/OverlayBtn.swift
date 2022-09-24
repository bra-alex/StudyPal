//
//  OverlayBtn.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 29/07/2022.
//

import SwiftUI

struct OverlayBtn: View {
    @Binding var showModal: Bool
    let img: String
    var body: some View {
        HStack {
            Spacer()
            Button {
                showModal.toggle()
            } label: {
                Image(systemName: img)
                    .font(.system(size: 25))
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(35)
                    .shadow(color: Color.black.opacity(0.3), radius: 6, x: 2, y: 2)
            }
        }
        .padding()
    }
}

struct OverlayBtn_Previews: PreviewProvider {
    static var previews: some View {
        OverlayBtn(showModal: .constant(false), img: "plus.message")
    }
}
