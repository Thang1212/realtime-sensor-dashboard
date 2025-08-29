- Postgress admin:
host: postgress
username: duythang

<!-- <%- include('partials/environment-table', { envData: envData }) %> -->

SELECT * FROM temperature_data
ORDER BY timestamp DESC
LIMIT 5;

SELECT * FROM pressure_data
ORDER BY timestamp DESC
LIMIT 5;

SELECT * FROM environment_data
ORDER BY timestamp DESC
LIMIT 5;

<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Nhiệt độ và độ ẩm</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2"><button type="button" class="btn btn-sm btn-outline-secondary">Share</button> <button type="button" class="btn btn-sm btn-outline-secondary">Export</button></div>
        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
            <svg class="bi" aria-hidden="true"><use xlink:href="#calendar3"></use></svg>
            This week
        </button>
    </div>
</div>
<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
<script src="/socket.io/socket.io.js"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>