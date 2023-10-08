def read_questions():
    with open('db/questions.txt', 'r') as file:
        text_data = file.read()

    data_parts = text_data.split('*')

    data_list = []

    for i in range(0, len(data_parts), 6):
        if i + 5 < len(data_parts):
            id_question = data_parts[i].strip()
            question = data_parts[i + 1].strip()
            answer_1 = data_parts[i + 2].strip()
            answer_2 = data_parts[i + 3].strip()
            answer_3 = data_parts[i + 4].strip()
            correct_answer = data_parts[i + 5].strip()

            data_dict = {
                'ID': id_question,
                'Question': question,
                'Answers': [answer_1, answer_2, answer_3],
                'Correct Answer': correct_answer
            }

            data_list.append(data_dict)
        else:
            print("Incomplete data entry at index", i)
    return data_list
