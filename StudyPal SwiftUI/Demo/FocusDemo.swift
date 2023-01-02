//
//  FocusDemo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 20/07/2022.
//

import SwiftUI

struct FocusDemo: View {
    @FocusState private var nameInFocus: Bool
    @ObservedObject var signUpVM = AuthController()
    var body: some View {
        VStack(alignment: .leading, spacing: 3.0) {
            RegisterTextFields(field: $signUpVM.name, placeholder: "Full Name", prompt: "")
                .focused($nameInFocus)
                .onAppear(){
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.75){
                        self.nameInFocus = true
                    }
                }
            
        }
    }
}

struct FocusDemo_Previews: PreviewProvider {
    static var previews: some View {
        FocusDemo()
    }
}
