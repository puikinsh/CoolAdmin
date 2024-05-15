export const form = (params) =>{ 
    return `
<div class="row" style="margin-bottom: 20px">
    <div class="col">
        <h4>Auto Response:</h4>
    </div>
    <div class="col">
        <input type="checkbox" data-toggle="toggle" data-on="Enabled" data-off="Disabled" id="AutoResponse" ${params?.autoResponse? "checked":null} />
    </div>
    <div class="col"></div>
    <div class="col"></div>
</div>
<div class="row" style="margin-bottom: 20px">
    <div class="col">
        <h4>Redirect:</h4>
    </div>
    <div class="col">
        <input type="checkbox"  ${params?.autoRedirect? "checked":null}  data-toggle="toggle" data-on="Enabled" data-off="Disabled" id="AutoRedirect" />
    </div>
    <div class="col"></div>
    <div class="col">
        <input type="text" class="form-control" id="redirectTo" />
    </div>
</div>
<div class="row" style="margin-bottom: 20px">
    <div class="col">
        <h4>Pre-quote:</h4>
    </div>
    <div class="col">
        <input type="checkbox"  ${params?.autoPrequote? "checked":null}  data-toggle="toggle" data-on="Enabled" data-off="Disabled" id="AutoPrequote" />
    </div>
    <div class="col"></div>
    <div class="col">
        <select class="form-control" id="selectOptionPreQuote">
        </select>
    </div>
</div>
<div class="row" style="margin-bottom: 20px">
    <div class="col">
        <h4>Trigger:</h4>
    </div>
    <div class="col">
        <input type="checkbox"  ${params?.autoTrigger? "checked":null}  data-toggle="toggle" data-on="Enabled" data-off="Disabled"  id="AutoTrigger"/>
    </div>
    <div class="col"></div>
    <div class="col">
        <select class="form-control" id="selectOptionTrigger">
        </select>
    </div>
</div>
<div class="row" style="margin-bottom: 20px">
    <div class="col">
        <h4>Retargeting:</h4>
    </div>
    <div class="col">
        <input type="checkbox"   ${params?.autoRetargeting? "checked":null} data-toggle="toggle" data-on="Enabled" data-off="Disabled"  id="AutoRetargeting"/>
    </div>
    <div class="col">
        <input type="text" class="form-control" id="DelayHour" />
        <label for="selectOption">Delay in hours</label>
    </div>
    <div class="col">
        <select class="form-control" id="selectOptionRetargeting">
        </select>
    </div>
</div>
`}