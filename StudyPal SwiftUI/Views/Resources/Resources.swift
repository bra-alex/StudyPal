//
//  Resources.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 20/08/2022.
//

import SwiftUI

struct Resources: View {
    @ObservedObject var resourcesModel = ResourcesModel()
    @State var show = false
    @State var uploadAlert = false
    @State var upload = false
    
    var body: some View {
        ZStack{
            List(resourcesModel.items, id: \.self) { item in
                var check = resourcesModel.checkIfExists(item.name)
                Button{
                    resourcesModel.openFiles(item.name)
                } label: {
                    HStack {
                        Image(systemName: "doc.text")
                        Text(item.name)
                        
                        Spacer()
                        
                        Button {
                            if check{
                                resourcesModel.deleteFile(item.name)
                                check = false
                            } else {
                                resourcesModel.downloadFiles(item.name)
                                check = true
                            }
                        } label: {
                            Image(systemName: check ? "trash" : "square.and.arrow.down")
                                .font(.system(size: 15, weight: .bold))
                                .foregroundColor(Color.primary)
                                .opacity(0.7)
                        }
                    }
                }
                .padding(.vertical)
            }
            .listStyle(PlainListStyle())
            .blur(radius: upload ? 10 : 0)
            .animation(.easeInOut, value: upload == true)
            .blur(radius: resourcesModel.download ? 10 : 0)
            .animation(.easeInOut, value: resourcesModel.download == true)
            .sheet(isPresented: $show) {
                DocumentPicker(alert: self.$uploadAlert, upload: self.$upload, resourcesModel: resourcesModel)
            }
            .alert(isPresented: $uploadAlert) {
                Alert(title: Text("Success"), message: Text("Upload Complete"), dismissButton: .default(Text("Ok")))
            }
            .alert(isPresented: $resourcesModel.alert){
                Alert(title: Text("Success"), message: Text(resourcesModel.alertMessage), dismissButton: .default(Text("Ok")))
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
            
            if upload || resourcesModel.download{
                CircularProgressBar(resourceModel: resourcesModel, status: upload ? "Uploading..." : "Downloading...")
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
