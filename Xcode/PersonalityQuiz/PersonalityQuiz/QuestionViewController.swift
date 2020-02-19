//
//  QuestionViewController.swift
//  PersonalityQuiz
//
//  Created by Yc on 2020/1/6.
//  Copyright © 2020 Mad Ness. All rights reserved.
//

import UIKit

class QuestionViewController: UIViewController {
  

    @IBOutlet weak var singleStackView: UIStackView!
    @IBOutlet weak var multipleStackView: UIStackView!
    @IBOutlet weak var rangedStackView: UIStackView!
    @IBOutlet weak var questionLabel: UILabel!
    
    @IBOutlet weak var singleButton1: UIButton!
    @IBOutlet weak var singleButton2: UIButton!
    @IBOutlet weak var singleButton3: UIButton!
    @IBOutlet weak var singleButton4: UIButton!
    
    @IBOutlet weak var multiLabel1: UILabel!
    @IBOutlet weak var multiLabel2: UILabel!
    @IBOutlet weak var multiLabel3: UILabel!
    @IBOutlet weak var multiLabel4: UILabel!
    
    @IBOutlet weak var multiSwitch1: UISwitch!
    @IBOutlet weak var multiSwitch2: UISwitch!
    @IBOutlet weak var multiSwitch3: UISwitch!
    @IBOutlet weak var multiSwitch4: UISwitch!
    
    
    @IBOutlet weak var rangeLabel1: UILabel!
    @IBOutlet weak var rangeLabel2: UILabel!
    @IBOutlet weak var sliderValue: UISlider!
    
    @IBOutlet weak var questionProgressView: UIProgressView!
    var questionIndex = 0
    var questions: [Question] = [Question(text: "Which food do you like the most?",type:.single,answers: [Answer(text: "Steak", type: .dog),Answer(text: "Fish", type: .cat),Answer(text: "Carrots", type: .rabbit),Answer(text: "Corn", type: .turtle)]),Question(text: "Which activities do you enjoy?",type: .multiple,answers: [Answer(text: "Swimming", type: .turtle),Answer(text: "Sleeping", type: .cat),Answer(text: "Cuddling", type: .rabbit),Answer(text: "Eating", type: .dog)]),Question(text: "How much do you enjoy car rides?",type: .ranged,answers: [Answer(text: "I dislike them", type: .cat),Answer(text: "I get a little nervous",type: .rabbit),Answer(text: "I barely notice them",type: .turtle),Answer(text: "I love them", type: .dog)])]
    
    var answerChosen: [Answer] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        updateUI()

    }
    @IBAction func multipleAnswerButtonPressed(_ sender: UIButton) {
        let currentAnswers = questions[questionIndex].answers
        
        if multiSwitch1.isOn {
            answerChosen.append(currentAnswers[0])
        }
        if multiSwitch2.isOn {
                   answerChosen.append(currentAnswers[1])
               }
        if multiSwitch3.isOn {
                   answerChosen.append(currentAnswers[2])
               }
        if multiSwitch4.isOn {
                   answerChosen.append(currentAnswers[3])
               }
        nextQuestion()
    }
    
    @IBAction func rangedAnswerButtonPressed(_ sender: UIButton) {
        let currentAnswers = questions[questionIndex].answers
        
        let index = Int(round(sliderValue.value * Float(currentAnswers.count - 1)))
        answerChosen.append(currentAnswers[index])
        
        nextQuestion()

    }
    @IBAction func singleAnswerButtonPressed(_ sender: UIButton) {
        let currentAnswers = questions[questionIndex].answers
        switch sender {
        case singleButton1:
            answerChosen.append(currentAnswers[0])
        case singleButton2:
            answerChosen.append(currentAnswers[1])
        case singleButton3:
            answerChosen.append(currentAnswers[2])
        case singleButton4:
            answerChosen.append(currentAnswers[3])
        default:
            break
        }
        nextQuestion()

    }
    func nextQuestion() {
        questionIndex += 1
        if questionIndex < questions.count {
            updateUI()
        } else {
            performSegue(withIdentifier: "ResultsSegue", sender: nil)
        }
        
    }
    func updateUI(){
        singleStackView.isHidden = true
        multipleStackView.isHidden = true
        rangedStackView.isHidden = true
        
        let currentQuestion = questions[questionIndex]
        let currentAnswers = currentQuestion.answers
        
        navigationItem.title = "Question #\(questionIndex + 1)"
        questionLabel.text = currentQuestion.text
        
        //设置底部进度条
        let totalProgress = Float(questionIndex) / Float(questions.count)
        questionProgressView.setProgress(totalProgress, animated: true)
        
        switch currentQuestion.type {
        case .single:
            updateSingleStack(using: currentAnswers)
        case .multiple:
            updateMultipleStack(using: currentAnswers)
        case .ranged:
            updateRangedStack(using: currentAnswers)
            
        }
        
    }
    
    func updateSingleStack(using answer: [Answer]) {
        singleStackView.isHidden = false
        singleButton1.setTitle(answer[0].text, for: .normal)
        singleButton2.setTitle(answer[1].text, for: .normal)
        singleButton3.setTitle(answer[2].text, for: .normal)
        singleButton4.setTitle(answer[3].text, for: .normal)
    }
    
    func updateMultipleStack(using answer: [Answer]) {
        multipleStackView.isHidden = false
        multiSwitch1.isOn = false
        multiSwitch2.isOn = false
        multiSwitch3.isOn = false
        multiSwitch4.isOn = false
        multiLabel1.text = answer[0].text
        multiLabel2.text = answer[1].text
        multiLabel3.text = answer[2].text
        multiLabel4.text = answer[3].text

    }
    func updateRangedStack(using answer: [Answer]) {
        rangedStackView.isHidden = false
        sliderValue.setValue(0.5, animated: false)
        rangeLabel1.text = answer.first?.text
        rangeLabel2.text = answer.last?.text
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ResultsSegue" {
            let resultsViewController = segue.destination as! ResultsViewController
            resultsViewController.responses = answerChosen
        }
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
