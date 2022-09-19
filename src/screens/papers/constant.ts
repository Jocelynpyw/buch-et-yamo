import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';

export type PapersStackParamList = {
  PapersTab: undefined;
  PapersList: {
    level: string;
    id: number;
  };
  PapersSubjectList: { level: string; id: number };
  PapersSubjectYearList: {
    level: string;
    subjectId: number;
    levelId: number;
    subject: number;
  };
  PapersSubjectDetail: { id: string; title: string; path?: string };
};

export const PapersStackRouteList: NavigatorRouteList<PapersStackParamList> = {
  PapersTab: 'PapersTab',
  PapersList: 'PapersList',
  PapersSubjectList: 'PapersSubjectList',
  PapersSubjectYearList: 'PapersSubjectYearList',
  PapersSubjectDetail: 'PapersSubjectDetail',
};

// subject
export const subjects = [
  [
    { title: 'Accounting (0505)', subjectId: 129, levelId: 160 },
    { title: 'Biology (0510)', subjectId: 145, levelId: 160 },
    { title: 'Chemistry (0515)', subjectId: 131, levelId: 160 },
    { title: 'Computer science (0595)', subjectId: 130, levelId: 160 },
    { title: 'Economics (0525)', subjectId: 158, levelId: 160 },
    { title: 'Physics (0580)', subjectId: 139, levelId: 160 },
    { title: 'English Literature (0535)', subjectId: 133, levelId: 160 },
    { title: 'English (0560)', subjectId: 159, levelId: 160 },
    { title: 'French (0545)', subjectId: 134, levelId: 160 },
    { title: 'Add Maths (0575)', subjectId: 142, levelId: 160 },
    { title: 'Geography (0550)', subjectId: 135, levelId: 160 },
    { title: 'Religious Studies (0585)', subjectId: 141, levelId: 160 },
    { title: 'Citizenship Education (0562)', subjectId: 144, levelId: 160 },
    { title: 'Commerce (0520)', subjectId: 132, levelId: 160 },
    { title: 'History (0560)', subjectId: 147, levelId: 160 },
    { title: 'Human Biology (0565)', subjectId: 151, levelId: 160 },
    { title: 'Mathmatics (0570)', subjectId: 138, levelId: 160 },
    { title: 'Logic (0590)', subjectId: 176, levelId: 160 },
    { title: 'Food and Nutrition (0595)', subjectId: 150, levelId: 160 },
    { title: 'Cameroon gce board syllabus', subjectId: 48, levelId: 0 },
  ],

  [
    { title: 'Accounting (0705)', subjectId: 129, levelId: 13 },
    { title: 'Biology (0710)', subjectId: 145, levelId: 13 },
    { title: 'Chemistry (715)', subjectId: 131, levelId: 13 },
    { title: 'Computer science (0795)', subjectId: 130, levelId: 13 },
    { title: 'Economics (0725)', subjectId: 158, levelId: 13 },
    { title: 'Physics (0780)', subjectId: 139, levelId: 13 },
    { title: 'English Literature (0735)', subjectId: 133, levelId: 13 },
    { title: 'English (0730)', subjectId: 159, levelId: 13 },
    { title: 'French (0745)', subjectId: 134, levelId: 13 },
    { title: 'Futher Mathematics (0775)', subjectId: 153, levelId: 13 },
    { title: 'Geography (0750)', subjectId: 135, levelId: 13 },
    { title: 'Geology (0755)', subjectId: 136, levelId: 13 },
    { title: 'Religious Studies (0785)', subjectId: 141, levelId: 13 },
    { title: 'History (0760)', subjectId: 147, levelId: 13 },
    { title: 'ICT (0796)', subjectId: 154, levelId: 13 },
    { title: 'Mathmatics (0770)', subjectId: 138, levelId: 13 },
    { title: 'Philosophy (0790)', subjectId: 140, levelId: 13 },
    { title: 'Food Science(0740)', subjectId: 155, levelId: -1 },
    { title: 'Special Bal. Education ', subjectId: 152, levelId: 13 },
    { title: 'Cameroon gce board syllabus', subjectId: 48, levelId: 0 },
  ],
  [
    { title: 'Architectural Project Management', subjectId: 452, levelId: 0 },
    { title: 'Electricity of Refrigeration', subjectId: 312, levelId: 0 },
    {
      title: 'Fundamental Refrigeration and Air Conditioning',
      subjectId: 311,
      levelId: 0,
    },
    {
      title: 'Refrigeration Repairs',
      subjectId: 313,
      levelId: 0,
    },
    {
      title: 'Architectural Applied Mechanics',
      subjectId: 453,
      levelId: 0,
    },
    {
      title: 'Architectural Technology and Practice',
      subjectId: 450,
      levelId: 0,
    },
    {
      title: 'Drawing and Architectural Modelling',
      subjectId: 451,
      levelId: 0,
    },
    {
      title: 'Automobile bodywork painting -ABP',
      subjectId: 314,
      levelId: 0,
    },
    {
      title: 'Automobile repair mechanics',
      subjectId: 319,
      levelId: 0,
    },
    {
      title: 'Bespoke tailoring-best (IH)specialty',
      subjectId: 323,
      levelId: 0,
    },
    {
      title: 'Building construction-CE-BC (F4-BA)',
      subjectId: 330,
      levelId: 0,
    },
    {
      title: 'Carpentry and joinery -cj',
      subjectId: 335,
      levelId: 0,
    },
    {
      title: 'Electrical power system -EPS(F3)',
      subjectId: 339,
      levelId: 0,
    },
    {
      title: 'Electronics -ELN(F2)',
      subjectId: 343,
      levelId: 0,
    },
    {
      title: 'Home Economics',
      subjectId: 137,
      levelId: 0,
    },
    {
      title: 'Law',
      subjectId: 347,
      levelId: 0,
    },
    {
      title: 'Law and government',
      subjectId: 329,
      levelId: 0,
    },
    {
      title: 'Manufacturing mechanics – MAME(F1)',
      subjectId: 348,
      levelId: 0,
    },
    {
      title: 'Marketing – MKT (ACC)',
      subjectId: 305,
      levelId: 0,
    },
    {
      title: 'Mechanical construction drawing',
      subjectId: 354,
      levelId: 0,
    },
    {
      title: 'Plumbing and hydraulic installation systems – PHIS (IRSH)',
      subjectId: 358,
      levelId: 0,
    },
    {
      title: 'Welding fabrication – wf (MF)',
      subjectId: 372,
      levelId: 0,
    },
    {
      title: 'taxation and information management systems',
      subjectId: 302,
      levelId: 0,
    },
    {
      title: 'Sheet metal – sm (CM)',
      subjectId: 368,
      levelId: 0,
    },
    {
      title: 'Secretarial Adminintraton and Communicaton',
      subjectId: 297,
      levelId: 0,
    },
  ],
  [
    { title: 'Architectural Project Management', subjectId: 452, levelId: 0 },
    { title: 'Electricity of Refrigeration', subjectId: 312, levelId: 0 },
    {
      title: 'Fundamental Refrigeration and Air Conditioning',
      subjectId: 311,
      levelId: 0,
    },
    {
      title: 'Refrigeration Repairs',
      subjectId: 313,
      levelId: 0,
    },
    {
      title: 'Architectural Applied Mechanics',
      subjectId: 453,
      levelId: 0,
    },
    {
      title: 'Architectural Technology and Practice',
      subjectId: 450,
      levelId: 0,
    },
    {
      title: 'Drawing and Architectural Modelling',
      subjectId: 451,
      levelId: 0,
    },
    {
      title: 'Automobile bodywork painting -ABP',
      subjectId: 314,
      levelId: 0,
    },
    {
      title: 'Automobile repair mechanics',
      subjectId: 319,
      levelId: 0,
    },
    {
      title: 'Bespoke tailoring-best (IH)specialty',
      subjectId: 323,
      levelId: 0,
    },
    {
      title: 'Building construction-CE-BC (F4-BA)',
      subjectId: 330,
      levelId: 0,
    },
    {
      title: 'Carpentry and joinery -cj',
      subjectId: 335,
      levelId: 0,
    },
    {
      title: 'Electrical power system -EPS(F3)',
      subjectId: 339,
      levelId: 0,
    },
    {
      title: 'Electronics -ELN(F2)',
      subjectId: 343,
      levelId: 0,
    },
    {
      title: 'Home Economics',
      subjectId: 137,
      levelId: 0,
    },
    {
      title: 'Law',
      subjectId: 347,
      levelId: 0,
    },
    {
      title: 'Law and government',
      subjectId: 329,
      levelId: 0,
    },
    {
      title: 'Manufacturing mechanics – MAME(F1)',
      subjectId: 348,
      levelId: 0,
    },
    {
      title: 'Marketing – MKT (ACC)',
      subjectId: 305,
      levelId: 0,
    },
    {
      title: 'Mechanical construction drawing',
      subjectId: 354,
      levelId: 0,
    },
    {
      title: 'Plumbing and hydraulic installation systems – PHIS (IRSH)',
      subjectId: 358,
      levelId: 0,
    },
    {
      title: 'Welding fabrication – wf (MF)',
      subjectId: 372,
      levelId: 0,
    },
    {
      title: 'taxation and information management systems',
      subjectId: 302,
      levelId: 0,
    },
    {
      title: 'Sheet metal – sm (CM)',
      subjectId: 368,
      levelId: 0,
    },
    {
      title: 'Secretarial Adminintraton and Communicaton',
      subjectId: 297,
      levelId: 0,
    },
  ],
  [
    { title: 'Additional Maths', subjectId: 257, levelId: 248 },
    { title: 'Agriculture', subjectId: 258, levelId: 248 },
    { title: 'Arabic', subjectId: 249, levelId: 248 },
    { title: 'Architectural Draughting', subjectId: 249, levelId: 248 },
    { title: 'Basic Maths', subjectId: 250, levelId: 248 },
    { title: 'Bible Knowledge', subjectId: 251, levelId: 248 },
    { title: 'Biology', subjectId: 259, levelId: 248 },
    { title: 'Book Keeping', subjectId: 260, levelId: 248 },
    { title: 'Building Construction', subjectId: 260, levelId: 248 },
    { title: 'Carpentry & Joinery', subjectId: 260, levelId: 248 },
    { title: 'Chemistry', subjectId: 261, levelId: 248 },
    { title: 'Civics', subjectId: 252, levelId: 248 },
    { title: 'Commerce', subjectId: 262, levelId: 248 },
    { title: 'Computer Studies', subjectId: 262, levelId: 248 },
    { title: 'Dini ya Kiislamu', subjectId: 274, levelId: 248 },
    { title: 'Electrical Draughting', subjectId: 274, levelId: 248 },
    { title: 'Electrical Engineering', subjectId: 275, levelId: 248 },
    { title: 'Electrical Installation', subjectId: 276, levelId: 248 },
    { title: 'Electronics & Radio Repair', subjectId: 276, levelId: 248 },
    { title: 'Engineering Science', subjectId: 277, levelId: 248 },
    { title: 'English', subjectId: 253, levelId: 248 },
    { title: 'Fine Art', subjectId: 278, levelId: 248 },
    { title: 'Fitting & Turning', subjectId: 262, levelId: 248 },
    { title: 'French', subjectId: 272, levelId: 248 },
    { title: 'Geography', subjectId: 263, levelId: 248 },
    { title: 'History', subjectId: 254, levelId: 248 },
    { title: 'Kiswahili', subjectId: 255, levelId: 248 },
    { title: 'Literature', subjectId: 256, levelId: 248 },
    { title: 'Mechanical Draughting', subjectId: 256, levelId: 248 },
    { title: 'Physics', subjectId: 264, levelId: 248 },
    { title: 'Radio & TV Servicing', subjectId: 278, levelId: 248 },
    { title: 'Welding & Metal Fabrication', subjectId: 278, levelId: 248 },

    { title: 'Workshop Technology', subjectId: 281, levelId: 248 },
  ],
  [
    { title: 'Additional Maths', subjectId: 257, levelId: 266 },
    { title: 'Accountancy', subjectId: 265, levelId: 266 },
    { title: 'Arabic', subjectId: 249, levelId: 266 },
    { title: 'Agriculture', subjectId: 258, levelId: 266 },
    { title: 'Basic Applied Math', subjectId: 269, levelId: 266 },
    { title: 'Biology', subjectId: 259, levelId: 266 },

    { title: 'Chemistry', subjectId: 261, levelId: 266 },
    { title: 'Commerce', subjectId: 262, levelId: 266 },
    { title: 'Computer Studies', subjectId: 262, levelId: 266 },
    { title: 'Divinity', subjectId: 262, levelId: 266 },

    { title: 'English', subjectId: 253, levelId: 266 },
    { title: 'Economics', subjectId: 270, levelId: 266 },
    { title: 'General Studies', subjectId: 267, levelId: 266 },
    { title: 'French', subjectId: 272, levelId: 266 },
    { title: 'Geography', subjectId: 263, levelId: 266 },
    { title: 'History', subjectId: 254, levelId: 266 },
    { title: 'Kiswahili', subjectId: 255, levelId: 266 },
    { title: 'Literature', subjectId: 256, levelId: 266 },
    { title: 'Islamic Knowledge', subjectId: 271, levelId: 266 },
    { title: 'Physics', subjectId: 264, levelId: 266 },
  ],
  [
    { title: 'Applied Maths', subjectId: 197, levelId: 196 },
    { title: 'Agriculture ', subjectId: 205, levelId: 196 },

    { title: 'Biology ', subjectId: 206, levelId: 196 },
    { title: 'Chemistry ', subjectId: 207, levelId: 196 },
    { title: 'CRE', subjectId: 203, levelId: 196 },
    { title: 'Commerce ', subjectId: 208, levelId: 196 },
    { title: 'Computer science ', subjectId: 209, levelId: 196 },
    { title: 'Physics ', subjectId: 218, levelId: 196 },
    { title: 'English Literature ', subjectId: 215, levelId: 196 },
    { title: 'English ', subjectId: 204, levelId: 196 },
    { title: 'French ', subjectId: 134, levelId: 196 },
    { title: 'Office practice ', subjectId: 217, levelId: 196 },
    { title: 'Geography ', subjectId: 212, levelId: 196 },
    { title: 'Religious Studies ', subjectId: 141, levelId: 196 },
    { title: 'History ', subjectId: 213, levelId: 196 },
    { title: 'Entrepreneurship ', subjectId: 210, levelId: 196 },
    { title: 'Mathmatics ', subjectId: 216, levelId: 196 },
    { title: 'Home management ', subjectId: 214, levelId: 196 },
    { title: 'Food and Nutrition ', subjectId: 211, levelId: 196 },
  ],

  [
    { title: 'Applied Maths', subjectId: 216, levelId: 219 },
    { title: 'Agriculture ', subjectId: 205, levelId: 219 },
    { title: 'Arts ', subjectId: 220, levelId: 219 },

    { title: 'Biology ', subjectId: 206, levelId: 219 },
    { title: 'Chemistry ', subjectId: 207, levelId: 219 },
    { title: 'CRE', subjectId: 203, levelId: 219 },
    { title: 'Commerce ', subjectId: 208, levelId: 219 },
    { title: 'Economics ', subjectId: 221, levelId: 219 },
    { title: 'General paper ', subjectId: 222, levelId: 219 },
    { title: 'Kiswahili', subjectId: 223, levelId: 219 },
    { title: 'Luganda', subjectId: 224, levelId: 219 },
    { title: 'Pure Maths', subjectId: 216, levelId: 219 },
    { title: 'Subsidiary ICT', subjectId: 209, levelId: 219 },
    { title: 'Subsidiary Maths', subjectId: 216, levelId: 219 },

    { title: 'Computer science ', subjectId: 209, levelId: 219 },
    { title: 'Physics ', subjectId: 218, levelId: 219 },
    { title: 'English Literature ', subjectId: 215, levelId: 219 },
    { title: 'English ', subjectId: 204, levelId: 219 },
    { title: 'Geography ', subjectId: 212, levelId: 219 },
    { title: 'Religious Studies ', subjectId: 141, levelId: 219 },
    { title: 'History ', subjectId: 213, levelId: 219 },
    { title: 'Entrepreneurship ', subjectId: 210, levelId: 219 },
    { title: 'Mathmatics ', subjectId: 216, levelId: 219 },
    { title: 'Home management ', subjectId: 214, levelId: 219 },
    { title: 'Food and Nutrition ', subjectId: 211, levelId: 219 },
  ],

  [
    { title: 'Mathematics', subjectId: 185, levelId: 180 },
    { title: 'Integrated Science', subjectId: 184, levelId: 180 },
    { title: 'English Language ', subjectId: 183, levelId: 180 },
    { title: 'Special Paper 1', subjectId: 187, levelId: 180 },
    { title: 'Special Paper 2', subjectId: 187, levelId: 180 },
    { title: 'Social Studies', subjectId: 186, levelId: 180 },
    { title: 'Creative & Technology Studies', subjectId: 182, levelId: 180 },
    { title: 'Cinyanja', subjectId: 181, levelId: 180 },
  ],
  [
    { title: 'Arts and design', subjectId: 185, levelId: 179 },
    { title: 'Business studies', subjectId: 185, levelId: 179 },
    { title: 'Computer studies', subjectId: 228, levelId: 179 },

    { title: 'Home economics', subjectId: 247, levelId: 179 },

    { title: 'Mathematics', subjectId: 185, levelId: 179 },
    { title: 'Religious education', subjectId: 193, levelId: 179 },
    { title: 'Religious education', subjectId: 193, levelId: 179 },

    { title: 'English Language ', subjectId: 183, levelId: 179 },
    { title: 'Science', subjectId: 192, levelId: 179 },
    { title: 'Social Studies', subjectId: 186, levelId: 179 },
  ],

  [
    { title: 'Additional Mathematics', subjectId: 188, levelId: 178 },

    { title: 'Agricultural science ', subjectId: 189, levelId: 178 },
    { title: 'Civic Education  ', subjectId: 226, levelId: 178 },
    { title: 'Commerce ', subjectId: 227, levelId: 178 },

    { title: 'Design and Technology', subjectId: 229, levelId: 178 },
    { title: 'Computer studies', subjectId: 228, levelId: 178 },

    { title: 'Fashion and Fabrics', subjectId: 230, levelId: 178 },

    { title: 'Food and Nutrition ', subjectId: 231, levelId: 178 },

    { title: 'French ', subjectId: 232, levelId: 178 },

    { title: 'Geography ', subjectId: 233, levelId: 178 },

    {
      title: 'Geometric and mechanical drawing ',
      subjectId: 234,
      levelId: 178,
    },

    { title: 'History', subjectId: 235, levelId: 178 },

    { title: 'Icibemba', subjectId: 241, levelId: 178 },

    { title: 'Home management', subjectId: 225, levelId: 178 },

    { title: 'Kiikaonde', subjectId: 242, levelId: 178 },

    { title: 'Literature', subjectId: 236, levelId: 178 },

    { title: 'Lunda', subjectId: 243, levelId: 178 },
    { title: 'Luvale', subjectId: 244, levelId: 178 },

    { title: 'Mathematics', subjectId: 185, levelId: 178 },
    { title: 'Metal work', subjectId: 237, levelId: 178 },

    { title: 'Musical arts education', subjectId: 238, levelId: 178 },
    { title: 'Physical Education', subjectId: 239, levelId: 178 },

    { title: 'Physics', subjectId: 240, levelId: 178 },

    { title: 'English Language ', subjectId: 183, levelId: 178 },
  ],
];
