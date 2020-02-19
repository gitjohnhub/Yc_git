//
//  ResultsViewController.swift
//  PersonalityQuiz
//
//  Created by Yc on 2020/1/6.
//  Copyright © 2020 Mad Ness. All rights reserved.
//

import UIKit

class ResultsViewController: UIViewController {
    
    var responses: [Answer]!

    @IBOutlet weak var resultAnswerLabel: UILabel!
    @IBOutlet weak var reslutDefinitionLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        calculatePersonalityResult()
        navigationItem.hidesBackButton = true

        // Do any additional setup after loading the view.
    }
    func calculatePersonalityResult() {
        var frequencyOfAnswers:[AnimalType: Int] = [:]
        let responseTypes = responses.map { $0.type }
        
        for response in responseTypes {
            let newCount: Int
            if let oldCount = frequencyOfAnswers[response] {
                newCount = oldCount + 1
            } else {
                newCount = 1
            }
            frequencyOfAnswers[response] = newCount
            
        }
        
 //     let frequentAnswerSorted = frequencyOfAnswers.sorted(by: {(pair1,pair2) -> Bool in return pair1.value > pair2.value})
        let frequentAnswerSorted = frequencyOfAnswers.sorted{$0.1 > $1.1}
        
        let mostCommonAnswer = frequentAnswerSorted.first!.key
        
        
        resultAnswerLabel.text = "You are a \(mostCommonAnswer.rawValue)!"
        reslutDefinitionLabel.text = mostCommonAnswer.definition
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
