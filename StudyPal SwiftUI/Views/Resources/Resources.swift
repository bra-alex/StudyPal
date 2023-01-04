//
//  Resources.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 20/08/2022.
//

import SwiftUI

struct Resources: View {
    @StateObject var resourcesVM = ResourcesViewModel()
    @State var show = false
    @State var uploadAlert = false
    @State var upload = false
    
    var body: some View {
        ZStack{
            List(resourcesVM.items, id: \.self) { item in
                var check = resourcesVM.checkIfExists(item.name)
                Button{
                    resourcesVM.openFiles(item.name)
                } label: {
                    HStack {
                        Image(systemName: "doc.text")
                        Text(item.name)
                        
                        Spacer()
                        
                        Button {
                            if check{
                                resourcesVM.deleteFile(item.name)
                                check = false
                            } else {
                                resourcesVM.downloadFiles(item.name)
                                check = true
                            }
                        } label: {
                            Image(systemName: check ? "trash" : "square.and.arrow.down")
                                .font(.system(size: 15, weight: .bold))
                                .foregroundColor(check ? .red : Color.primary)
                                .opacity(0.7)
                        }
                    }
                }
                .padding(.vertical)
            }
            .listStyle(.plain)
            .blur(radius: upload ? 10 : 0)
            .animation(.easeInOut, value: upload == true)
            .blur(radius: resourcesVM.download ? 10 : 0)
            .animation(.easeInOut, value: resourcesVM.download == true)
            .sheet(isPresented: $show) {
                DocumentPicker(alert: self.$uploadAlert, upload: self.$upload, resourcesVM: resourcesVM)
            }
            .alert(isPresented: $uploadAlert) {
                Alert(title: Text("Success"), message: Text("Upload Complete"), dismissButton: .default(Text("Ok")))
            }
            .alert(isPresented: $resourcesVM.alert){
                Alert(title: Text("Success"), message: Text(resourcesVM.alertMessage), dismissButton: .default(Text("Ok")))
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        show.toggle()
                    } label: {
                        Image(systemName: "arrow.up.doc")
                            .padding(.trailing)
                    }
                }
            }
            
            if upload || resourcesVM.download{
                CircularProgressBar(resourceModel: resourcesVM, status: upload ? "Uploading..." : "Downloading...")
                    .transition(AnyTransition.opacity.animation(.easeInOut))
            }
        }
    }
}

struct Resources_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView{
            Resources()
        }
    }
}
