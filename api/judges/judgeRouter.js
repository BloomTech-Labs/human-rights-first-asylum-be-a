const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const fs = require('fs');
const JSZip = require('jszip');
const cacache = require('cacache');
const authRequired = require('../middleware/authRequired');
const { default: axios } = require('axios');
const { nextTick } = require('process');

// TODO add auth to router - final phase

// router
const router = express.Router();

//middleware

router.use('/:judge_id', authRequired, verify.verifyJudgeId);

//routes
router.get('/', Cache.checkCache, (req, res) => {
  Judges.findAllSimple()
    .then((judges) => {
      Cache.makeCache('/judges', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

// router.get('/:judge_id/cases', async (req, res) => {
//   const data = await Judges.findJudgeCases(req.params.judge_id);
//   res.status(200).json({ data });
// });

router.get('/:judge_id/cases', async (req, res, next) => {
  // Grab the judge cases data
  try {
    const raw_data = await Judges.findJudgeCases(req.params.judge_id);
    // Issue POST req to DS API
    // axios
    //   .post(`${process.env.DS_API_URL}${/*from DS team*/}`, { data: raw_data }) // What endpoint to hit?
    //   .then((data_viz_res) => {
    //     res.status(200).json({ data: data_viz_res.data }); // What is the data structure that comes back from DS?
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err });
    //   });
    const mock_data = {
      data: [
        {
          name: 'Denied',
          type: 'bar',
          x: ['Nationality', 'Political Opinion'],
          y: [0.0, 0.0],
        },
        {
          name: 'Granted',
          type: 'bar',
          x: ['Nationality', 'Political Opinion'],
          y: [0.0, 1.0],
        },
        {
          name: 'Remanded',
          type: 'bar',
          x: ['Nationality', 'Political Opinion'],
          y: [0.0, 0.0],
        },
        {
          name: 'Sustained',
          type: 'bar',
          x: ['Nationality', 'Political Opinion'],
          y: [1.0, 0.0],
        },
        {
          name: 'Terminated',
          type: 'bar',
          x: ['Nationality', 'Political Opinion'],
          y: [0.0, 1.0],
        },
      ],
      layout: {
        barmode: 'stack',
        template: {
          data: {
            bar: [
              {
                error_x: { color: '#2a3f5f' },
                error_y: { color: '#2a3f5f' },
                marker: { line: { color: '#E5ECF6', width: 0.5 } },
                type: 'bar',
              },
            ],
            barpolar: [
              {
                marker: { line: { color: '#E5ECF6', width: 0.5 } },
                type: 'barpolar',
              },
            ],
            carpet: [
              {
                aaxis: {
                  endlinecolor: '#2a3f5f',
                  gridcolor: 'white',
                  linecolor: 'white',
                  minorgridcolor: 'white',
                  startlinecolor: '#2a3f5f',
                },
                baxis: {
                  endlinecolor: '#2a3f5f',
                  gridcolor: 'white',
                  linecolor: 'white',
                  minorgridcolor: 'white',
                  startlinecolor: '#2a3f5f',
                },
                type: 'carpet',
              },
            ],
            choropleth: [
              { colorbar: { outlinewidth: 0, ticks: '' }, type: 'choropleth' },
            ],
            contour: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                colorscale: [
                  [0.0, '#0d0887'],
                  [0.1111111111111111, '#46039f'],
                  [0.2222222222222222, '#7201a8'],
                  [0.3333333333333333, '#9c179e'],
                  [0.4444444444444444, '#bd3786'],
                  [0.5555555555555556, '#d8576b'],
                  [0.6666666666666666, '#ed7953'],
                  [0.7777777777777778, '#fb9f3a'],
                  [0.8888888888888888, '#fdca26'],
                  [1.0, '#f0f921'],
                ],
                type: 'contour',
              },
            ],
            contourcarpet: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                type: 'contourcarpet',
              },
            ],
            heatmap: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                colorscale: [
                  [0.0, '#0d0887'],
                  [0.1111111111111111, '#46039f'],
                  [0.2222222222222222, '#7201a8'],
                  [0.3333333333333333, '#9c179e'],
                  [0.4444444444444444, '#bd3786'],
                  [0.5555555555555556, '#d8576b'],
                  [0.6666666666666666, '#ed7953'],
                  [0.7777777777777778, '#fb9f3a'],
                  [0.8888888888888888, '#fdca26'],
                  [1.0, '#f0f921'],
                ],
                type: 'heatmap',
              },
            ],
            heatmapgl: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                colorscale: [
                  [0.0, '#0d0887'],
                  [0.1111111111111111, '#46039f'],
                  [0.2222222222222222, '#7201a8'],
                  [0.3333333333333333, '#9c179e'],
                  [0.4444444444444444, '#bd3786'],
                  [0.5555555555555556, '#d8576b'],
                  [0.6666666666666666, '#ed7953'],
                  [0.7777777777777778, '#fb9f3a'],
                  [0.8888888888888888, '#fdca26'],
                  [1.0, '#f0f921'],
                ],
                type: 'heatmapgl',
              },
            ],
            histogram: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'histogram',
              },
            ],
            histogram2d: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                colorscale: [
                  [0.0, '#0d0887'],
                  [0.1111111111111111, '#46039f'],
                  [0.2222222222222222, '#7201a8'],
                  [0.3333333333333333, '#9c179e'],
                  [0.4444444444444444, '#bd3786'],
                  [0.5555555555555556, '#d8576b'],
                  [0.6666666666666666, '#ed7953'],
                  [0.7777777777777778, '#fb9f3a'],
                  [0.8888888888888888, '#fdca26'],
                  [1.0, '#f0f921'],
                ],
                type: 'histogram2d',
              },
            ],
            histogram2dcontour: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                colorscale: [
                  [0.0, '#0d0887'],
                  [0.1111111111111111, '#46039f'],
                  [0.2222222222222222, '#7201a8'],
                  [0.3333333333333333, '#9c179e'],
                  [0.4444444444444444, '#bd3786'],
                  [0.5555555555555556, '#d8576b'],
                  [0.6666666666666666, '#ed7953'],
                  [0.7777777777777778, '#fb9f3a'],
                  [0.8888888888888888, '#fdca26'],
                  [1.0, '#f0f921'],
                ],
                type: 'histogram2dcontour',
              },
            ],
            mesh3d: [
              { colorbar: { outlinewidth: 0, ticks: '' }, type: 'mesh3d' },
            ],
            parcoords: [
              {
                line: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'parcoords',
              },
            ],
            pie: [{ automargin: true, type: 'pie' }],
            scatter: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scatter',
              },
            ],
            scatter3d: [
              {
                line: { colorbar: { outlinewidth: 0, ticks: '' } },
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scatter3d',
              },
            ],
            scattercarpet: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scattercarpet',
              },
            ],
            scattergeo: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scattergeo',
              },
            ],
            scattergl: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scattergl',
              },
            ],
            scattermapbox: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scattermapbox',
              },
            ],
            scatterpolar: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scatterpolar',
              },
            ],
            scatterpolargl: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scatterpolargl',
              },
            ],
            scatterternary: [
              {
                marker: { colorbar: { outlinewidth: 0, ticks: '' } },
                type: 'scatterternary',
              },
            ],
            surface: [
              {
                colorbar: { outlinewidth: 0, ticks: '' },
                colorscale: [
                  [0.0, '#0d0887'],
                  [0.1111111111111111, '#46039f'],
                  [0.2222222222222222, '#7201a8'],
                  [0.3333333333333333, '#9c179e'],
                  [0.4444444444444444, '#bd3786'],
                  [0.5555555555555556, '#d8576b'],
                  [0.6666666666666666, '#ed7953'],
                  [0.7777777777777778, '#fb9f3a'],
                  [0.8888888888888888, '#fdca26'],
                  [1.0, '#f0f921'],
                ],
                type: 'surface',
              },
            ],
            table: [
              {
                cells: { fill: { color: '#EBF0F8' }, line: { color: 'white' } },
                header: {
                  fill: { color: '#C8D4E3' },
                  line: { color: 'white' },
                },
                type: 'table',
              },
            ],
          },
          layout: {
            annotationdefaults: {
              arrowcolor: '#2a3f5f',
              arrowhead: 0,
              arrowwidth: 1,
            },
            coloraxis: { colorbar: { outlinewidth: 0, ticks: '' } },
            colorscale: {
              diverging: [
                [0, '#8e0152'],
                [0.1, '#c51b7d'],
                [0.2, '#de77ae'],
                [0.3, '#f1b6da'],
                [0.4, '#fde0ef'],
                [0.5, '#f7f7f7'],
                [0.6, '#e6f5d0'],
                [0.7, '#b8e186'],
                [0.8, '#7fbc41'],
                [0.9, '#4d9221'],
                [1, '#276419'],
              ],
              sequential: [
                [0.0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1.0, '#f0f921'],
              ],
              sequentialminus: [
                [0.0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1.0, '#f0f921'],
              ],
            },
            colorway: [
              '#636efa',
              '#EF553B',
              '#00cc96',
              '#ab63fa',
              '#FFA15A',
              '#19d3f3',
              '#FF6692',
              '#B6E880',
              '#FF97FF',
              '#FECB52',
            ],
            font: { color: '#2a3f5f' },
            geo: {
              bgcolor: 'white',
              lakecolor: 'white',
              landcolor: '#E5ECF6',
              showlakes: true,
              showland: true,
              subunitcolor: 'white',
            },
            hoverlabel: { align: 'left' },
            hovermode: 'closest',
            mapbox: { style: 'light' },
            paper_bgcolor: 'white',
            plot_bgcolor: '#E5ECF6',
            polar: {
              angularaxis: {
                gridcolor: 'white',
                linecolor: 'white',
                ticks: '',
              },
              bgcolor: '#E5ECF6',
              radialaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            },
            scene: {
              xaxis: {
                backgroundcolor: '#E5ECF6',
                gridcolor: 'white',
                gridwidth: 2,
                linecolor: 'white',
                showbackground: true,
                ticks: '',
                zerolinecolor: 'white',
              },
              yaxis: {
                backgroundcolor: '#E5ECF6',
                gridcolor: 'white',
                gridwidth: 2,
                linecolor: 'white',
                showbackground: true,
                ticks: '',
                zerolinecolor: 'white',
              },
              zaxis: {
                backgroundcolor: '#E5ECF6',
                gridcolor: 'white',
                gridwidth: 2,
                linecolor: 'white',
                showbackground: true,
                ticks: '',
                zerolinecolor: 'white',
              },
            },
            shapedefaults: { line: { color: '#2a3f5f' } },
            ternary: {
              aaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
              baxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
              bgcolor: '#E5ECF6',
              caxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            },
            title: { x: 0.05 },
            xaxis: {
              automargin: true,
              gridcolor: 'white',
              linecolor: 'white',
              ticks: '',
              title: { standoff: 15 },
              zerolinecolor: 'white',
              zerolinewidth: 2,
            },
            yaxis: {
              automargin: true,
              gridcolor: 'white',
              linecolor: 'white',
              ticks: '',
              title: { standoff: 15 },
              zerolinecolor: 'white',
              zerolinewidth: 2,
            },
          },
        },
      },
    };
    res.status(200).json({ judge_cases: mock_data });
  } catch (err) {
    res.status(404).json({ err });
  }
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Judge:
 *      type: object
 *      required:
 *        - name
 *        - judge_county
 *        - judge_image
 *        - date_appointed
 *        - birth_date
 *        - biography
 *        - denial_rate
 *        - approval_rate
 *        - appointed_by
 *        - countries
 *        - cases
 *      properties:
 *        name:
 *          type: string
 *          description: This is a foreign key (the judge's name)
 *        judge_county:
 *          type: string
 *          description: Where the judge holds court
 *        judge_image:
 *           type: string
 *           description: An image of the judge
 *        date_appointed:
 *            type: string
 *            description: When the judge was appointed to the court
 *        birth_date:
 *            type: string
 *            description: When the judge was born
 *        biography:
 *            type: string
 *            description: Relevant information about the judge
 *        denial_rate:
 *            type: number
 *            description: The percentage of refugees denied
 *        approval_rate:
 *            type: number
 *            description: The percentage of refugees approved
 *        appointed_by:
 *            type: string
 *            description: Which administration appointed the judge
 *        countries:
 *            type: array
 *            description: A list of objects of countries from which the refugees seeking asylum in the judge's court have come
 *        cases:
 *            type: array
 *            description: A list of case objects that the judge has ruled on
 *      example:
 *                  name: 'Frank Jones'
 *                  judge_county: 'Albemarle'
 *                  judge_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  date_appointed: '01-12-1927'
 *                  biography: 'Once upon a time, I was not a judge. And then I was.'
 *                  denial_rate: 98.2
 *                  approval_rate: 1.8
 *                  appointed_by: 'FDR'
 *                  countries: ['TBA']
 *                  cases: ['TBA']
 *
 * /judges:
 *  get:
 *    description: Returns a list of judge
 *    summary: Get a list of all judges
 *    security:
 *      - okta: []
 *    tags:
 *      - judges
 *    responses:
 *      200:
 *        description: array of judges
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Judge'
 *              example:
 *                - name: 'Frank Jones'
 *                  judge_county: 'Albemarle'
 *                  judge_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  date_appointed: '01-12-1927'
 *                  biography: 'Once upon a time, I was not a judge. And then I was.'
 *                  denial_rate: 98.2
 *                  approval_rate: 1.8
 *                  appointed_by: 'FDR'
 *                  countries: ['TBA']
 *                  cases: ['TBA']
 *                - name: 'Frank Jones'
 *                  judge_county: 'Albemarle'
 *                  judge_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  date_appointed: '01-12-1927'
 *                  biography: 'Once upon a time, I was not a judge. And then I was.'
 *                  denial_rate: 98.2
 *                  approval_rate: 1.8
 *                  appointed_by: 'FDR'
 *                  countries: ['TBA']
 *                  cases: ['TBA']
 */

router.get('/all', Cache.checkCache, (req, res) => {
  Judges.findAll()
    .then((judges) => {
      Cache.makeCache('/judges/all', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    judgeName:
 *      name: name
 *      in: path
 *      description: Name of the judge to return
 *      required: true
 *      example: "Jack%20Sparrow"
 *      schema:
 *        type: string
 *
 * /judge/{name}:
 *  get:
 *    description: Find judges by name
 *    summary: Returns a single judge
 *    security:
 *      - okta: []
 *    tags:
 *      - judges
 *    parameters:
 *      - $ref: '#/components/parameters/judgeName'
 *    responses:
 *      200:
 *        description: A judge object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Judge'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'judge not found'
 */

router.get('/:name', Cache.checkCache, (req, res) => {
  const name = String(req.params.name);
  const key = `/judge/${name}`;
  Judges.findFullDataByName(name)
    .then((judges) => {
      Cache.makeCache(key, JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/csv', Cache.zipCache, (req, res) => {
  const name = String(req.params.name);

  Judges.writeCSV(name)
    .then((csv) => {
      const zip = new JSZip();

      zip.file(`${name}_judge_data.csv`, csv[0]);
      zip.file(`${name}_country_data.csv`, csv[1]);
      zip.file(`${name}_case_data.csv`, csv[2]);
      zip.file(`${name}_social_data.csv`, csv[3]);
      zip.file(`${name}_grounds_data.csv`, csv[4]);

      cacache.tmp
        .withTmp('/tmp/data', (dir) => {
          zip
            .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream(`${dir}.zip`))
            .on('finish', function () {
              res.header('Content-Type', 'application/zip');
              res.attachment(`${name}_data.zip`);
              res.status(200).download(`${dir}.zip`);
            });
        })
        .then(() => {
          // `dir` no longer exists
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
