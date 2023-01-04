//
//  ResourcesModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/09/2022.
//

import Foundation
import FirebaseStorage
import SwiftUI


class ResourcesViewModel: ObservableObject{
    @Published var items: [StorageReference] = []
    @Published var progress: CGFloat = 0.0
    @Published var alert = false
    @Published var alertMessage = ""
    var download = false
    
    init() {
        getFiles()
    }
    
    func getFiles() {
        items.removeAll()
        let ref = FirebaseManager.shared.storage.reference().child("resources")
        ref.listAll { results, error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
            
            for item in results!.items{
                self.items.append(item)
            }
        }
    }
    
    func openFiles(_ name: String){
        guard
            let path = FileManager
                .default
                .urls(for: .documentDirectory, in: .userDomainMask)
                .first?
                .appendingPathComponent("\(name)")
        else { return }
        
        if FileManager().fileExists(atPath: path.path){
            DocumentViewer().presentDocument(url: path)
        }
    }
    
    func downloadFiles(_ name: String){
        
        let ref = FirebaseManager.shared.storage.reference(withPath: "resources/\(name)")
        guard
            let path = FileManager
                .default
                .urls(for: .documentDirectory, in: .userDomainMask)
                .first?
                .appendingPathComponent("\(name)")
        else { return }
        
        if FileManager().fileExists(atPath: path.path){
            
            print("File already exists")
            
        } else {
            let downloadTask = ref.write(toFile: path)
            
            self.download.toggle()
            
            downloadTask.observe(.progress) { snapshot in
                if Int(snapshot.progress!.completedUnitCount) > 0{
                    self.progress = CGFloat(Double(snapshot.progress!.completedUnitCount) / Double(snapshot.progress!.totalUnitCount))
                }
            }
            
            downloadTask.observe(.success) { snapshot in
                self.download = false
                self.alertMessage = "Download Complete"
                self.alert.toggle()
                downloadTask.removeAllObservers()
                self.progress = 0.0
            }
        }
    }
    
    func deleteFile(_ name: String) {
        let docsUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
        
        let destinationUrl = docsUrl?.appendingPathComponent("\(name)")
        if let destinationUrl = destinationUrl {
            guard FileManager().fileExists(atPath: destinationUrl.path) else { return }
            do {
                try FileManager().removeItem(atPath: destinationUrl.path)
                self.alertMessage = "File deleted successfully"
                self.alert.toggle()
            } catch let error {
                print("Error while deleting video file: ", error)
            }
        }
    }
    
    func checkIfExists(_ name: String) -> Bool{
        if let ref = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first?.appendingPathComponent("\(name)"){
            if (FileManager().fileExists(atPath: ref.path)) {
                return true
            } else{
                return false
            }
        } else {
            return false
        }
    }
}
