//
//  ResourcesDemo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 25/09/2022.
//

import SwiftUI

struct ResourcesDemo: View {
    @State var show = false
    @State var alert = false
    var body: some View {
        Button {
            show.toggle()
        } label: {
            Image(systemName: "arrow.up.doc")
                .padding(.trailing)
        }
        .sheet(isPresented: $show) {
//            DocumentPicker(alert: self.$alert, upload: self.$alert)
        }
        .alert(isPresented: $alert) {
            Alert(title: Text("Success"), message: Text("Upload Complete"), dismissButton: .default(Text("Ok")))
        }
    }
}

struct ResourcesDemo_Previews: PreviewProvider {
    static var previews: some View {
        ResourcesDemo()
    }
}
