const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_surveys',
  password: 'asnaeb',
  port: 5010
})

// surveys table
const getSurveys = (req, res) => {
  pool.query(
    'SELECT * from surveys ORDER BY id ASC; SELECT * from options ORDER BY id ASC; ',
    (err, result) => {
      if (err) throw err
      res.status(200).json(parseResult(result))
    }
  )
}

const getSurveyById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM surveys WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createSurvey = (request, response) => {
  const { question } = request.body

  pool.query(
    'INSERT INTO surveys (question) VALUES ($1) RETURNING *',
    [question],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)
      response.status(201).json(results.rows[0])
    }
  )
}

const updateSurvey = (request, response) => {
  const id = parseInt(request.params.id)
  console.log(request.body)
  const { question } = request.body

  pool.query('UPDATE surveys SET question = $1 WHERE id = $2', [question, id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).send(`Survey modified with ID: ${id}`)
  })
}

const deleteSurvey = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM surveys WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(204).send(`Survey deleted with ID: ${id}`)
  })
}

// options table

const getOptions = (req, res) => {
  pool.query('SELECT * from options ORDER BY id ASC', (err, result) => {
    if (err) throw err

    res.status(200).json(result.rows)
  })
}

const getOptionById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM options WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createOption = (request, response) => {
  const { label, times_selected, query_id } = request.body

  pool.query(
    'INSERT INTO options (label,times_selected,query_id) VALUES ($1,$2,$3) RETURNING *',
    [label, 0, query_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Option added with ID: ${results.rows[0].id}`).json(results.rows[0])
    }
  )
}

const updateOption = (request, response) => {
  const id = parseInt(request.params.id)

  const { label, times_selected, query_id } = request.body

  pool.query(
    `UPDATE options SET ${parseSetQuery(request.body)} WHERE id = $4`,
    [label, times_selected, query_id, id],
    (error, results) => {
      if (error) throw error

      console.log(results.rows[0])
      response.status(200).send(`Option modified with ID: ${id}`).json(results.rows[0])
    }
  )
}

const deleteOption = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM options WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Option deleted with ID: ${id}`)
  })
}

function parseSetQuery(obj) {
  let str = ''
  let dex = 1
  for (const prop in obj) {
    if (obj[prop]) str += `${prop} = $${dex++},`
  }
  return str.substring(0, --str.length)
}

function parseResult(res) {
  const [surveys, options] = res
  return surveys.rows.map((survey) => {
    return { ...survey, options: options.rows.filter((opt) => opt.survey_id == survey.id) }
  })
}

module.exports = {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getOptions,
  getOptionById,
  createOption,
  updateOption,
  deleteOption
}
