import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css'],
})
export class ConditionsComponent implements OnInit {
  conditionsList = [
    {
      name: 'Allergies',
      count: 121,
    },
    {
      name: 'Autoimmune Disorders',
      count: 82,
    },
    {
      name: 'Blood Disorders',
      count: 11,
    },
    {
      name: 'Cardiovascular Diseases',
      count: 23,
    },
    {
      name: 'Dental and Oral Health',
      count: 22,
    },
    {
      name: 'Digestive System Disorders',
      count: 34,
    },
    {
      name: 'Eye Disorders',
      count: 5,
    },
    {
      name: 'Genetic Disorders',
      count: 3,
    },
    {
      name: 'Endocrine System Disorders',
      count: 2,
    },
    {
      name: 'Ear, Nose and Throat Disorders',
      count: 4,
    },
    {
      name: 'Nervous System Disorders',
      count: 5,
    },
    {
      name: 'Musculoskeletal Disorders',
      count: 3,
    },
    {
      name: 'Mental and Behavioural Disorders',
      count: 20,
    },
    {
      name: 'Infectious Diseases',
      count: 145,
    },

    {
      name: 'Urinary System Disorders',
      count: 50,
    },
    {
      name: 'Skin Disorders',
      count: 14,
    },
    {
      name: 'Respiratory System Disorders',
      count: 681,
    },
    {
      name: 'Nutritional Disorders',
      count: 232,
    },
    {
      name: "Women's Health Issues",
      count: 547,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
