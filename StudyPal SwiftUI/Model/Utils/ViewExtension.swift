//
//  ViewExtension.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 02/01/2023.
//

import SwiftUI

extension View{
    func sync(_ published: Binding<Bool>, with binding: Binding<Bool>) -> some View {
        self
            .onChange(of: published.wrappedValue) { published in
                binding.wrappedValue = published
            }
            .onChange(of: binding.wrappedValue) { binding in
                published.wrappedValue = binding
            }
    }
}
